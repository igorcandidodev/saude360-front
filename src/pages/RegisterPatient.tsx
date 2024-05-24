import { IonContent, IonPage, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";

/* logo */
import Logo from "../Images/Logo Saude360.svg";

import { Form } from "../components/FormRegister";
import { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";

const RegisterPatient: React.FC = () => {
  const [indexForm, setIndexForm] = useState(1);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const history = useHistory(); 

  const calculateAge = (date: string) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDateOfBirth(date);
    const calculatedAge = calculateAge(date);
    setAge(calculatedAge);
  };


  const backStep = () => {
    if(age !== null && age < 18 && indexForm === 3){
        setIndexForm(indexForm - 1);
    }else{
        setAge(null);
        setIndexForm(1);
    }
  }

  const backToPatientsPage = () => {
    history.push('/pacientes'); 
  };
  
  const renderForm = () => {
    switch (indexForm) {
      case 1:
        return (
          <>
            <Form.PersonalInformation isProfessional={false} onDateChange={handleDateChange} />
            <Form.Actions>
                {age !== null && age < 18 ? (
                <Form.ActionButton
                  text="PRÓXIMO"
                  onClick={() => setIndexForm(2)}
                />
              ) : (
                <Form.ActionButton
                  text="PRÓXIMO"
                  onClick={() => setIndexForm(3)}
              />
              )}
            </Form.Actions>
          </>
        );
      case 2:
        return (
          <>
            <Form.MinorPatient />
            <Form.Actions>
              <div className="flex flex-col md:flex md:flex-row md:gap-4">
                <Form.ActionButtonOutline
                  text="VOLTAR"
                  onClick={() => backStep()}
                />
                <Form.ActionButton
                  text="PRÓXIMO"
                  onClick={() => setIndexForm(3)}
                />
              </div>
            </Form.Actions>
          </>
        );
        case 3:
            return (
              <>
                <Form.Address />
                <Form.Actions>
                  <div className="flex flex-col md:flex md:flex-row md:gap-4">
                    <Form.ActionButtonOutline
                      text="VOLTAR"
                      onClick={() => backStep()}
                    />
                    <Form.ActionButton
                      text="CADASTRAR"
                    />
                  </div>
                </Form.Actions>
              </>
            );
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex justify-center">
          <LeftOutlined className="mt-10 w-10" style={{ color: '#0443BE', fontSize: '24px' }} onClick={backToPatientsPage}/>
          <IonImg className="mt-10 w-80" src={Logo} alt="Logo"></IonImg>
        </div>
        <Form.Root>
            {renderForm()}
        </Form.Root>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPatient;
