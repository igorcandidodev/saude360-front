import { IonContent, IonPage } from "@ionic/react";
import ProfessionalConfiguration from "../components/ConfigurationForms/ProfessionalConfiguration";
import PatientConfiguration from "../components/ConfigurationForms/PatientConfiguration";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";

function ConfigurationPage() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Recuperar a role do localStorage
    const roles = JSON.parse(localStorage.getItem("roles"));
    if (roles && roles.length > 0) {
      const userRole = roles[0].authority; // Supondo que a primeira role é a principal
      console.log("Role do usuário:", userRole); // Imprimindo a role no console
      setUserRole(userRole);
    }
  }, []);

  return (
    <IonPage>
      <Menu />
      <IonContent>
        {userRole === "ROLE_PROFESSIONAL" ? (
          <ProfessionalConfiguration />
        ) : (
          <PatientConfiguration />
        )}
      </IonContent>
    </IonPage>
  );
}

export default ConfigurationPage;
