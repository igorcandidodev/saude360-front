import { IonContent, IonPage, IonToast } from "@ionic/react";
import { useState } from "react";
import { IonImg } from "@ionic/react";
import BackgroundImage from "../Images/BackgroundImage.png";
import Saude360 from "../Images/Saude360.svg";
import Saude360Hero from "../Images/saude360-hero.svg";
import { Form } from "../components/FormRegister";
import FormLogin from "../components/FormRegister/FormLogin";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserAuthContext } from "../context/userAuth";
import { AuthenticationService } from "../core/services/AuthenticationService";
import ToastService from "../core/services/ToastService";
import { useHistory } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const LoginPage: React.FC = () => {
  const { authInitial, setUserCpf } = useContext(UserAuthContext);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const authenticationService = new AuthenticationService();
  const history = useHistory();

  const handleRegister = () => {
    history.push('/cadastro-profissional');
  };
  
  const handleLogin = () => {
    if (authInitial.cpf === "" || authInitial.password === "") {
      return ToastService.showError("Preencha todos os campos");
    }
    setLoading(true);
    authenticationService
      .login(authInitial)
      .then((response) => {
        ToastService.showSuccess("Login efetuado com sucesso");
        localStorage.setItem("token", response.token);
        localStorage.setItem("roles", JSON.stringify(response.roles));
        localStorage.setItem("cpf", response.cpf);
        setUserCpf(response.cpf);
  
        setLoading(false);

        let path = "/home";

        response.roles.forEach(role => {
          if (role.authority === "ROLE_PATIENT") {
            path = `/agendamentos`;
        }});
        history.push(path);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 403) {
          return ToastService.showError("CPF ou senha inválidos");
        }
        if (error.response.status === 404) {
          return ToastService.showError("CPF não cadastrado");
        }
        ToastService.showError(
          "Erro inesperado, por favor entre em contato com o suporte"
        );
      });
  };

  return (
<IonPage>
      <IonContent>
        <div className="grid grid-cols-2 h-screen w-full">
          {/* Coluna da imagem */}
          <div className="h-screen hidden lg:block">
            <IonImg
              className="h-full w-full object-cover"
              src={BackgroundImage}
              alt="Background"
            />
          </div>

          {/* Coluna do formulário */}
          <div className="flex flex-col justify-center items-center p-8 w-screen lg:w-full">
            <div className="flex justify-center flex-col items-center">
              <IonImg className="w-24 mb-8 md:hidden" src={Saude360Hero} alt="Logo" />
              <IonImg className="w-60 mb-8" src={Saude360} alt="Logo" />
            </div>

            <Form.Root >
              <FormLogin  /> {/* Campos de entrada */}
              <p className="text-gray-400 italic text-sm">8 dígitos, com pelo menos 1 letra maiúscula.</p>
              <Form.Actions >
                <Form.ActionButton
                  id="Entrar"
                  text="ENTRAR"
                  onClick={handleLogin}
                  disabled={loading}
                />
                <div className="flex items-center justify-center my-2">
                  <span className="text-gray-500 mx-2">ou</span>
                </div>
                <Form.ActionButtonOutline text="CADASTRE-SE" id="Cadastrar" onClick={handleRegister}/>
                <div className="flex justify-center mt-4">
                  <Link to="/esqueceu-senha" className="text-blue-500 hover:underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </Form.Actions>
            </Form.Root>

            {loading && (
              <div className="mt-5">
                <MoonLoader
                  color="#0443BE"
                  loading
                  size={50}
                  speedMultiplier={0.5}
                  data-testid="moon-loader"
                />
              </div>
            )}
          </div>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
