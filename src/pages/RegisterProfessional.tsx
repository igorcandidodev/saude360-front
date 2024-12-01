import { IonContent, IonPage, IonImg, IonToggle } from "@ionic/react";
import Menu from "../components/Menu";

/* logo */
import Logo from "../Images/Logo Saude360.svg";

import { Form } from "../components/FormRegister";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import ProfessionalService from "../core/services/ProfessionalService";
import { useHistory } from "react-router-dom";
import ToastService from "../core/services/ToastService";
import { MoonLoader } from "react-spinners";
import { cpf } from "cpf-cnpj-validator";

const RegisterProfessional: React.FC = () => {
  const [indexForm, setIndexForm] = useState(1);
  const professionalService = new ProfessionalService();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [hasClinic, setHasClinic] = useState(false);

  const { user, setUser, resetUser }: any = useContext(UserContext);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = async () => {
    if (!hasClinic) {
      setUser({
        ...user,
        clinic: null,
      });
    }
    console.log(user);
    setLoading(true);
    await professionalService
      .createProfessional(user)
      .then((response) => {
        console.log("Professional registered successfully", response);
        setLoading(false);
        resetUser();
        ToastService.showSuccess("Cadastro efetuado com sucesso");
        history.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        ToastService.showError("Erro ao cadastrar profissional");
        console.error("Error registering professional:", error);
      });
  };

  const validateForm = () => {
    console.log("Validando formulário...");

    let isValid = false;

    if (indexForm === 1) {
      const isValidFullName = !!user.fullName?.trim();
      console.log("Nome completo válido:", isValidFullName);

      const isValidCPF = cpf.isValid(user.cpf?.replace(/\D/g, ""));
      console.log("CPF válido:", isValidCPF);

      const isValidBirthDate = !!user.birthDate;
      console.log("Data de nascimento válida:", isValidBirthDate);

      const isValidEmail = !!user.email?.includes("@");
      console.log("E-mail válido:", isValidEmail);

      const phoneRegex = /^\(\d{2}\)9\d{4}-\d{4}$/;
      const isValidPhoneNumber = phoneRegex.test(user.phoneNumber || "");
      console.log("Número de celular válido:", isValidPhoneNumber);

      const isValidClinic = !hasClinic || !!user.clinic;
      console.log("Consultório válido:", isValidClinic);

      const isValidProfessionalFields =
        !user.isProfessional ||
        (!!user.healthSectorsNames &&
          !!user.cnsNumber &&
          user.password?.length >= 6 &&
          /^\d{15}$/.test(user.cnsNumber)); // CNS válido
      console.log("Campos profissionais válidos:", isValidProfessionalFields);

      const isValidCNS = /^\d{15}$/.test(user.cnsNumber || "");
      console.log("Número CNS válido:", isValidCNS);

      const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
        user.password || ""
      );
      console.log("Senha válida:", isValidPassword);

      isValid =
        isValidFullName &&
        isValidCPF &&
        isValidBirthDate &&
        isValidEmail &&
        isValidPhoneNumber &&
        isValidClinic &&
        isValidProfessionalFields &&
        isValidCNS &&
        isValidPassword;
    } else if (indexForm === 2) {
      const phoneRegex = /^\(\d{2}\)9\d{4}-\d{4}$/;
      const isValidCNPJ =
        !!user.clinic[0]?.cnpj && user.clinic[0].cnpj.length === 18; // CNPJ com máscara
      console.log("CNPJ válido:", isValidCNPJ);

      const isValidCNES = /^\d{15}$/.test(user.clinic[0]?.cnesNumber || ""); // CNES deve ter 15 dígitos
      console.log("CNES válido:", isValidCNES);

      const isValidClinicPhoneNumber =
        phoneRegex.test(user.clinic[0]?.phoneNumber || "") ||
        /^\(\d{2}\)\d{4}-\d{4}$/.test(user.clinic[0]?.telephoneNumber || "");
      console.log(
        "Número de telefone da clínica válido:",
        isValidClinicPhoneNumber
      );

      isValid = isValidCNPJ && isValidCNES && isValidClinicPhoneNumber;
    } else if (indexForm === 3) {
      const isValidCEP = /^\d{5}-\d{3}$/.test(
        user.clinic[0]?.address?.cep || ""
      );
      console.log("CEP válido:", isValidCEP);

      const isValidStreet = !!user.clinic[0]?.address?.street?.trim();
      console.log("Rua válida:", isValidStreet);

      const isValidClinicNumber = !!user.clinic[0]?.address?.number;
      console.log("Número do consultório válido:", isValidClinicNumber);

      const isValidNeighborhood =
        !!user.clinic[0]?.address?.neighborhood?.trim();
      console.log("Bairro válido:", isValidNeighborhood);

      const isValidCity = !!user.clinic[0]?.address?.city?.trim();
      console.log("Cidade válida:", isValidCity);

      const isValidState = !!user.clinic[0]?.address?.state?.trim();
      console.log("Estado válido:", isValidState);

      isValid =
        isValidCEP &&
        isValidStreet &&
        isValidClinicNumber &&
        isValidNeighborhood &&
        isValidCity &&
        isValidState;
    }

    console.log("Formulário geral válido:", isValid);
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [user, hasClinic, indexForm]); // Adicionando indexForm para garantir que a validação seja feita ao mudar de etapa

  const renderForm = () => {
    switch (indexForm) {
      case 1:
        return (
          <>
            <Form.PersonalInformation isProfessional={true} />
            <div className="flex justify-start mt-4">
              <IonToggle
                labelPlacement="end"
                checked={hasClinic}
                onClick={() => setHasClinic(!hasClinic)}
              >
                Deseja cadastrar um consultório?
              </IonToggle>
            </div>
            <Form.Actions>
              <Form.ActionButton
                text="PRÓXIMO"
                onClick={() => setIndexForm(2)}
                disabled={!isFormValid}
              />
              {loading && (
                <div className="mt-5 flex justify-center">
                  <MoonLoader
                    color="#0443BE"
                    loading
                    size={50}
                    speedMultiplier={0.5}
                  />
                </div>
              )}
            </Form.Actions>
          </>
        );
      case 2:
        return (
          <>
            <Form.DataClinic />
            <Form.Actions>
              <div className="flex flex-col md:flex md:flex-row md:gap-4">
                <Form.ActionButtonOutline
                  text="VOLTAR"
                  onClick={() => setIndexForm(1)}
                />
                <Form.ActionButton
                  text="PRÓXIMO"
                  onClick={() => setIndexForm(3)}
                  disabled={!isFormValid}
                />
              </div>
            </Form.Actions>
          </>
        );
      case 3:
        return (
          <>
            <Form.Address isProfessional={true} />
            <Form.Actions>
              <div className="flex flex-col md:flex md:flex-row md:gap-4">
                <Form.ActionButtonOutline
                  text="VOLTAR"
                  onClick={() => setIndexForm(2)}
                />
                <Form.ActionButton
                  text="CADASTRAR"
                  disabled={!isFormValid || loading}
                  onClick={handleRegister}
                />
              </div>
              {loading && (
                <div className="mt-5 flex justify-center">
                  <MoonLoader
                    color="#0443BE"
                    loading
                    size={50}
                    speedMultiplier={0.5}
                  />
                </div>
              )}
            </Form.Actions>
          </>
        );
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex justify-center">
          <IonImg className="mt-10 w-80" src={Logo} alt="Logo"></IonImg>
        </div>
        <Form.Root>{renderForm()}</Form.Root>
      </IonContent>
    </IonPage>
  );
};

export default RegisterProfessional;
