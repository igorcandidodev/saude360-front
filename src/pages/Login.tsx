import { IonContent, IonPage } from '@ionic/react';
import { useState } from "react";
import { IonImg } from "@ionic/react";
import BackgroundImage from "../Images/BackgroundImage.png";
import Saude360 from "../Images/Saude360.svg";
import { Form } from "../components/FormRegister";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // add a lógica de autenticação
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
                <div className="flex flex-col pt-6">
                  <label className="pb-2" htmlFor="username">CPF</label>
                  <input
                    className="border border-zinc-400 p-2 rounded"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Digite seu CPF"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col pt-6">
                  <label className="pb-2" htmlFor="password">Senha</label>
                  <input
                    className="border border-zinc-400 p-2 rounded"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
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
