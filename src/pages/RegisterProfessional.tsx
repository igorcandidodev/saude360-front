import { IonContent, IonPage, IonImg } from "@ionic/react";
import Menu from "../components/Menu";

/* logo */
import Logo from "../Images/Logo Saude360.svg";

import { Form } from "../components/FormRegister";
import { useState } from "react";

const RegisterProfessional: React.FC = () => {
  const [indexForm, setIndexForm] = useState(1);

  const renderForm = () => {
    switch (indexForm) {
      case 1:
        return (
          <>
            <Form.PersonalInformation />
            <Form.Actions>
              <Form.ActionButton
                text="Próximo"
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
              <div className="flex flex-col">
                <Form.ActionButtonOutline
                  text="Voltar"
                  onClick={() => setIndexForm(1)}
                />
                <Form.ActionButton
                  text="Próximo"
                  onClick={() => setIndexForm(3)}
                />
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
        <Form.Root>
          {renderForm()}
        </Form.Root>
      </IonContent>
    </IonPage>
  );
};

export default RegisterProfessional;