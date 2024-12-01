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
    const isValidFullName = !!user.fullName?.trim();
    console.log("Nome completo válido:", isValidFullName);

    // Validação do CPF
    const isValidCPF = cpf.isValid(user.cpf?.replace(/\D/g, "")); // Remover qualquer caractere não numérico antes da validação
    console.log("CPF válido:", isValidCPF);

    const isValidBirthDate = !!user.birthDate;
    console.log("Data de nascimento válida:", isValidBirthDate);

    const isValidEmail = !!user.email?.includes("@");
    console.log("E-mail válido:", isValidEmail);

    // Validação do número de telefone
    const phoneRegex = /^\(\d{2}\)9\d{4}-\d{4}$/;
    const isValidPhoneNumber = phoneRegex.test(user.phoneNumber || "");
    console.log("Número de celular válido:", isValidPhoneNumber);

    const isValidClinic = !hasClinic || !!user.clinic;
    console.log("Consultório válido:", isValidClinic);

    // Validação dos campos profissionais
    const isValidProfessionalFields =
      !user.isProfessional ||
      (!!user.healthSectorsNames &&
        !!user.cnsNumber &&
        user.password?.length >= 6 && // Senha válida
        /^\d{15}$/.test(user.cnsNumber)); // CNS válido
    console.log("Campos profissionais válidos:", isValidProfessionalFields);

    // Verificação das validações específicas
    const isValidCNS = /^\d{15}$/.test(user.cnsNumber || "");
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
      user.password || ""
    );

    console.log("Número CNS válido:", isValidCNS);
    console.log("Senha válida:", isValidPassword);

    const isValid =
      isValidFullName &&
      isValidCPF &&
      isValidBirthDate &&
      isValidEmail &&
      isValidPhoneNumber &&
      isValidClinic &&
      isValidProfessionalFields &&
      isValidCNS &&
      isValidPassword; // Agora verifica também CNS, senha e CPF

    console.log("Formulário geral válido:", isValid);

    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [user, hasClinic]);

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
              {hasClinic ? (
                <Form.ActionButton
                  text="PRÓXIMO"
                  onClick={() => setIndexForm(2)}
                  disabled={!isFormValid}
                />
              ) : (
                <Form.ActionButton
                  text="CADASTRAR"
                  onClick={handleRegister}
                  disabled={!isFormValid || loading}
                />
              )}
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
