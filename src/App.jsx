import { Route } from "react-router-dom";
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
import { UserAuthContextProvider } from "./context/userAuth";
import { ToastContainer } from 'react-toastify';
import { ProfessionalProvider } from "./context/ProfessionalContext";
import PrivateRoute from "./components/PrivateRoute.tsx";

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
  return (
    <IonApp>
      <ToastContainer />
      <UserAuthContextProvider>
        <UserContextProvider>
          <ProfessionalProvider>
            <IonReactRouter>
              <IonRouterOutlet>
                <PrivateRoute exact path="/pacientes" component={Patients} />
                <PrivateRoute exact path="/financeiro" component={Finances} />
                <PrivateRoute path="/ficha-pacientes/:id" component={PatientRecord} />
                <PrivateRoute exact path="/posts/:userId" component={Posts} />
                <PrivateRoute exact path="/cadastro-profissional" component={RegisterProfessional} />
                <PrivateRoute exact path="/cadastro-paciente" component={RegisterPatient} />
                <PrivateRoute exact path="/home" component={MainEntry} />
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/configuracoes" component={Configuration} />
                <PrivateRoute exact path="/agendamentos" component={Appointments} />
                <Route component={NotFound} />
                <Route exact path="/esqueceu-senha" component={ForgotPassword} />
              </IonRouterOutlet>
            </IonReactRouter>
          </ProfessionalProvider>
        </UserContextProvider>
    </UserAuthContextProvider>
  </IonApp>
);

export default App;