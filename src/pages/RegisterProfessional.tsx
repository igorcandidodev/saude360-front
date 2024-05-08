import { IonContent, IonPage, IonImg} from '@ionic/react';
import Menu from '../components/Menu';


/* logo */
import Logo from  "../Images/Logo Saude360.svg"

import { Form } from '../components/FormRegister';

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
                <Form.Root>
                    <Form.Header text="Informacões Pessoais"/>
                    <Form.PersonalInformation />
                </Form.Root>
            </IonContent>
        </IonPage>
    )

}

export default RegisterProfessional;