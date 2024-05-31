import { IonContent, IonPage, IonImg } from "@ionic/react";
import Menu from "../components/Menu";

/* logo */
import Logo from "../Images/Logo Saude360.svg";

import { Form } from "../components/FormRegister";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfessionalService from "../core/services/ProfessionalService";
import { useHistory } from "react-router-dom";
import ToastService from "../core/services/ToastService";

const RegisterProfessional: React.FC = () => {
  const [indexForm, setIndexForm] = useState(1);
  const professionalService = new ProfessionalService();
  const history = useHistory();

  const { user }: any = useContext(UserContext);

  const handleRegister = async () => {
    await professionalService
      .createProfessional(user)
      .then((response) => {
        console.log("Professional registered successfully", response);
        ToastService.showSuccess("Cadastro efetuado com sucesso");
        history.push("/login");
      })
      .catch((error) => {
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
            <Form.Actions>
              <Form.ActionButton
                text="PRÓXIMO"
                onClick={() => setIndexForm(2)}
              />
            </Form.Actions>
          </>
        );
      case 2:
        return (
          <>
            <Form.Address />
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
            <Form.DataClinic />
            <Form.Actions>
              <div className="flex flex-col md:flex md:flex-row md:gap-4">
                <Form.ActionButtonOutline
                  text="VOLTAR"
                  onClick={() => setIndexForm(2)}
                />
                <Form.ActionButton text="CADASTRAR" onClick={handleRegister} />
              </div>
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
