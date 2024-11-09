import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import SessionTable from "../components/SessionTable";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import PatientService from "../core/services/PatientService";
import { formatDate } from "../utils/formatDate";
import { ConsultationService } from "../core/services/ConsultationService";
import { MoonLoader } from "react-spinners"; // Importar o loader

const PatientRecord: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const patientService = new PatientService();
  const consultationService = new ConsultationService();
  const [patient, setPatient] = useState({ cpf: null, birthDate: null, email: null, phoneNumber: null, fullName: null });
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true); // Adicionar estado de loading

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const responsePatient = await patientService.getPatientById(Number(id));
        const responseConsultations = await consultationService.findAllByPatientId(Number(id));
        setConsultations(responseConsultations);
        setPatient(responsePatient);
        setLoading(false); // Definir loading como false após carregar os dados
      } catch (error) {
        console.error(error);
        setLoading(false); // Também definir como false em caso de erro
      }
    };

    fetchPatient();
  }, [id]);

  const backToPatientsPage = () => {
    history.push("/pacientes");
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center justify-center mt-10 mr-5 ml-5">
          <div className="max-w-4xl w-full">
            <div className="w-full flex items-center mb-6">
              <LeftOutlined
                className="w-10"
                style={{ color: "#0443BE", fontSize: "24px" }}
                onClick={backToPatientsPage}
              />
              <h2 className="text-zinc-600 text-xl font-semibold text-center">
                Dados do Paciente
              </h2>
            </div>

            {loading ? ( // Exibir loader enquanto os dados estão sendo carregados
              <div className="flex justify-center items-center h-full">
                <MoonLoader size={50} color={"#123abc"} loading={loading} />
              </div>
            ) : (
              <>
                <h2 className="text-zinc-600 text-xl font-semibold mt-6 text-left">
                  Informações
                </h2>


                <div className="grid grid-cols-2 gap-1 pr-10 pt-5 lg:flex lg:flex-wrap lg:gap-4">
                  <div className="flex flex-col mb-2 lg:w-1/1">
                    <span className="pb-2 font-semibold">NOME</span>
                    <span>{patient?.fullName}</span>
                  </div>
                  <div className="flex flex-col mb-2 lg:w-1/1">
                    <span className="pb-2 font-semibold">CPF</span>
                    <span>{patient?.cpf}</span>
                  </div>
                  <div className="flex flex-col mb-2 lg:w-1/1">
                    <span className="pb-2 font-semibold">DATA DE NASCIMENTO</span>
                    <span>{patient?.birthDate != null ? formatDate(patient?.birthDate) : null}</span>
                  </div>
                  <div className="flex flex-col mb-2 lg:w-1/1">
                    <span className="pb-2 font-semibold">EMAIL</span>
                    <span>{patient?.email}</span>
                  </div>
                  <div className="flex flex-col mb-2 lg:w-1/1">
                    <span className="pb-2 font-semibold">NÚMERO DE CELULAR</span>
                    <span>{patient?.phoneNumber}</span>
                  </div>
                </div>

                <h2 className="text-zinc-600 text-xl font-semibold mt-6 mb-4 text-left">
                  Sessões
                </h2>

                <div className="max-w-4xl w-full mx-auto">
                  <SessionTable consultations={consultations} />
                </div>
              </>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PatientRecord;