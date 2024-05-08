import { IonContent, IonPage, IonImg} from '@ionic/react';
import Menu from '../components/Menu';
import Form from '../components/FormProfessional';


/* logo */
import Logo from  "../Images/Logo Saude360.svg"

const RegisterProfessional : React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div className="flex justify-center">
                    <IonImg className='mt-10 w-80'
                    src={Logo}
                    alt="Logo"
                    ></IonImg>  
                </div>
                <Form />
            </IonContent>
        </IonPage>
    )

}

export default RegisterProfessional;