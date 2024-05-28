import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Patients from './pages/Patients'; // Importe a página Patients aqui
import RegisterProfessional from './pages/RegisterProfessional';
import RegisterPatient from './pages/RegisterPatient';
import MainEntry from './components/schedule/MainEntry'
import PatientRecord from './pages/PatientRecord';
import Login from './pages/Login';
import { UserContextProvider } from './context/userContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

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
import './theme/variables.css';

/* Tailwind styles */
import './theme/tailwind.css';

setupIonicReact();

const App = () => (
  <IonApp>
  <UserContextProvider>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/pacientes">
          <Patients />
        </Route>
        <Route exact path="/ficha-pacientes">
          <PatientRecord />
        </Route>
        <Route exact path="/cadastro-profissional">
          <RegisterProfessional />
        </Route>
        <Route exact path="/cadastro-paciente">
          <RegisterPatient />
        </Route>
        <Route exact path="/">
        <MainEntry />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
    </UserContextProvider>
  </IonApp>
);

export default App;
