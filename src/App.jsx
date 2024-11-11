import { Route, Routes } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Patients from "./pages/Patients"; 
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
import PrivateRoute from "./components/PrivateRoute";

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

const App = () => (
  <IonApp>
    <ToastContainer />
    <UserAuthContextProvider>
      <UserContextProvider>
        <ProfessionalProvider>
          <IonReactRouter>
            <IonRouterOutlet>

              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/esqueceu-senha" element={<ForgotPassword />} />

                <Route element={<PrivateRoute />}> {/* Rotas protegidas */}
                  <Route path="/pacientes" element={<Patients />} />
                  <Route path="/financeiro" element={<Finances />} />
                  <Route path="/ficha-pacientes/:id" element={<PatientRecord />} />
                  <Route path="/posts/:userId" element={<Posts />} />
                  <Route path="/cadastro-profissional" element={<RegisterProfessional />} />
                  <Route path="/cadastro-paciente" element={<RegisterPatient />} />
                  <Route path="/home" element={<MainEntry />} />
                  <Route path="/configuracoes" element={<Configuration />} />
                  <Route path="/agendamentos" element={<Appointments />} />
                </Route>

                <Route component={NotFound} /> {/* Rota para NotFound */}
              </Routes>

            </IonRouterOutlet>
          </IonReactRouter>
        </ProfessionalProvider>
      </UserContextProvider>
    </UserAuthContextProvider>
  </IonApp>
);

export default App;
