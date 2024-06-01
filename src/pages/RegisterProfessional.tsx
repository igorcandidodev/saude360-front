import { IonContent, IonPage, IonImg, IonToggle } from "@ionic/react";
import Menu from "../components/Menu";

/* logo */
import Logo from "../Images/Logo Saude360.svg";

import { Form } from "../components/FormRegister";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfessionalService from "../core/services/ProfessionalService";
import { useHistory } from "react-router-dom";
import ToastService from "../core/services/ToastService";
import { MoonLoader } from "react-spinners";

const RegisterProfessional: React.FC = () => {
  const [indexForm, setIndexForm] = useState(1);
  const professionalService = new ProfessionalService();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [hasClinic, setHasClinic] = useState(false);

  const { user, setUser }: any = useContext(UserContext);

  const handleRegister = async () => {
    if(!hasClinic) {
      setUser({
        ...user,
        clinic: null
      });
    }
    console.log(user)
    setLoading(true);
    await professionalService
      .createProfessional(user)
      .then((response) => {
        console.log("Professional registered successfully", response);
        setLoading(false);
        ToastService.showSuccess("Cadastro efetuado com sucesso");
        history.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        ToastService.showError("Erro ao cadastrar profissional");
        console.error("Error registering professional:", error);
      });
  };

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
                />
              ) : (
                <Form.ActionButton
                  text="CADASTRAR"
                  onClick={handleRegister}
                  disabled={loading}
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
                />
              </div>
            </Form.Actions>
          </>
        );
      case 3:
        return (
          <>
            <Form.Address />
            <Form.Actions>
              <div className="flex flex-col md:flex md:flex-row md:gap-4">
                <Form.ActionButtonOutline
                  text="VOLTAR"
                  onClick={() => setIndexForm(2)}
                />
                <Form.ActionButton
                  text="CADASTRAR"
                  disabled={loading}
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
