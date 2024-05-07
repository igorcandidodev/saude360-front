import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Menu from '../components/Menu';
import Form from '../components/FormProfessional';

const RegisterProfessional : React.FC = () => {
    return (
        <IonPage>
            {/* <Menu /> */}
            <IonContent>
                <Form />
            </IonContent>
        </IonPage>
    )

}

export default RegisterProfessional;