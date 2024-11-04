import { Route, Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Patients from "./pages/Patients"; // Importe a página Patients aqui
import Finances from "./pages/Finances"
import RegisterProfessional from "./pages/RegisterProfessional";
import RegisterPatient from "./pages/RegisterPatient";
import MainEntry from "./components/schedule/MainEntry";
import PatientRecord from "./pages/PatientRecord";
import Login from "./pages/Login";
import Configuration from "./pages/Configuration"
import NotFound from './components/ErrorPages/NotFound';
import ForgotPassword from "./pages/ForgotPassword";
import { UserContextProvider } from "./context/userContext";
import { UserAuthContextProvider, UserAuthContext } from "./context/userAuth";
import { ToastContainer } from 'react-toastify';
import { ProfessionalProvider } from "./context/ProfessionalContext"; // Importe seu ProfessionalProvider
import { useContext } from "react";

import Posts from "./pages/Posts";
import 'react-toastify/dist/ReactToastify.css';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import "./theme/variables.css";

/* Tailwind styles */
import "./theme/tailwind.css";
import Appointments from "./pages/Appointments";

setupIonicReact();

const App = () => {

  const authContext = useContext(UserAuthContext);
  const isAuthenticated = authContext?.isAuthenticated;

  return (
    <IonApp>
      <ToastContainer />
      <UserAuthContextProvider>
        <UserContextProvider>
          <ProfessionalProvider>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route exact path="/pacientes">
                  {isAuthenticated ? <Patients /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/financeiro">
                  {isAuthenticated ? <Finances /> : <Redirect to="/login" />}
                </Route>
                <Route path="/ficha-pacientes/:id">
                  {isAuthenticated ? <PatientRecord /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/posts/:userId">
                  {isAuthenticated ? <Posts /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/cadastro-profissional">
                  {isAuthenticated ? <RegisterProfessional /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/cadastro-paciente">
                  {isAuthenticated ? <RegisterPatient /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/home">
                  {isAuthenticated ? <MainEntry /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/configuracoes">
                  {isAuthenticated ? <Configuration /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/agendamentos">
                  {isAuthenticated ? <Appointments /> : <Redirect to="/login" />}
                </Route>
                <Route component={NotFound} />
                <Route exact path="/esqueceu-senha">
                  <ForgotPassword />
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </ProfessionalProvider>
        </UserContextProvider>
      </UserAuthContextProvider>
    </IonApp>
  );
};

export default App;
