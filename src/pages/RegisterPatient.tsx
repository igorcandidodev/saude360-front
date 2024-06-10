import { IonContent, IonPage, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";

/* logo */
import Logo from "../Images/Logo Saude360.svg";
import { Form } from "../components/FormRegister";
import { LeftOutlined } from "@ant-design/icons";
import ToastService from "../core/services/ToastService";
import PatientService from "../core/services/PatientService";
import { MoonLoader } from "react-spinners";
import { UserContext } from "../context/userContext";

const RegisterPatient: React.FC = () => {
  const [indexForm, setIndexForm] = useState(1);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const history = useHistory();
  const patientService = new PatientService();
  const [loading, setLoading] = useState(false);
  
  const { user, setUser }: any = useContext(UserContext);

  const [patients, setPatients] = useState<any[]>([]);


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

  const fetchPatients = async () => {
    try {
      const patientsData = await patientService.getPatientsTable();
      setPatients(patientsData);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDateOfBirth(date);
    const calculatedAge = calculateAge(date);
    setAge(calculatedAge);
    setUser({ ...user, birthDate: date });
  };

  const backStep = () => {
    if (age !== null && age < 18 && indexForm === 3) {
      setIndexForm(indexForm - 1);
    } else {
      setAge(null);
      setIndexForm(1);
    }
  }

  const backToPatientsPage = () => {
    history.push('/pacientes');
  };

  const handleRegister = async () => {
    setLoading(true);
    setUser({
      ...user,
      clinic: null,
      healthSectorsNames: null,
      cnsNumber: null,
      password: null
    });
    console.log(user);
    await patientService
      .createPatient(user)
      .then((response) => {
        setLoading(false);
        ToastService.showSuccess("Cadastro efetuado com sucesso");
        history.push("/pacientes");
        window.location.reload(); 
      })
      .catch((error) => {
        setLoading(false);
        ToastService.showError("Erro ao cadastrar paciente");
        console.error("Erro ao registrar paciente:", error);
      });
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
/*                   text="CADASTRAR"
                  onClick={handleRegister} */
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
            <Form.Address  isProfessional={false}/>
            <Form.Actions>
              <div className="flex flex-col md:flex md:flex-row md:gap-4">
                <Form.ActionButtonOutline
                  text="VOLTAR"
                  onClick={() => backStep()}
                />
                <Form.ActionButton
                  text="CADASTRAR"
                  onClick={handleRegister}
                  disabled={loading}
                />
              </div>
              {loading && (
                <div className="mt-5 flex justify-center">
                  <MoonLoader
                    color="#0443BE"
                    loading
                    size={50}
                    speedMultiplier={0.5}
                  />
                </div>
              )}
            </Form.Actions>
          </>
        );
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex justify-center">
          <LeftOutlined className="mt-10 w-10" style={{ color: '#0443BE', fontSize: '24px' }} onClick={backToPatientsPage} />
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
