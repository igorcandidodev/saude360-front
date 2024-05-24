import { IonContent, IonPage } from '@ionic/react';
import { useState } from "react";
import { IonImg } from "@ionic/react";
import BackgroundImage from "../Images/BackgroundImage.png";
import Saude360 from "../Images/Saude360.svg";
import { Form } from "../components/FormRegister";
import FormLogin from "../components/FormRegister/FormLogin";

const LoginPage: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cpf:", cpf);
    console.log("Password:", password);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="grid grid-cols-2 h-screen">

          {/* Coluna da imagem */}
          <div className="h-full">
            <IonImg className="h-full w-full object-cover" src={BackgroundImage} alt="Background" />
          </div>

          {/* Coluna do formulário */}
          <div className="flex flex-col justify-center items-center p-8">
            <div className="flex justify-center">
              <IonImg className="w-60 mb-8" src={Saude360} alt="Logo" />
            </div>
            
            <Form.Root>
              <form className="w-80 md:w-2.5/12 2xl:w-7/12" onSubmit={handleLogin}>
              <FormLogin /> {/* Campos de entrada */}

                <Form.Actions>
                  <Form.ActionButton text="Entrar" />
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-gray-500 mx-2">ou</span>
                  </div>
                  <Form.ActionButtonOutline text="Cadastre-se" />
                </Form.Actions>
              </form>
            </Form.Root>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
