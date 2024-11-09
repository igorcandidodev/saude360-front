import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import FormFinance from '../components/FormRegister/FormFinance';
import { Form } from "../components/FormRegister";
import FormActionButton from '../components/FormRegister/FormActionButton';

const RegisterFinance: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Nova Finança</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col justify-center items-center p-8">
          <FormFinance />
        </div>
        <Form.Actions>
          <div className="flex justify-center">
            <FormActionButton text="SALVAR" type="submit" />
          </div>
        </Form.Actions>
      </IonContent>
    </IonPage>
    
  
  );
};

export default RegisterFinance;