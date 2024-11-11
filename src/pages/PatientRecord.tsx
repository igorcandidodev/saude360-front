import { IonContent, IonPage, IonModal } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import SessionTable from "../components/SessionTable";
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import PatientService from "../core/services/PatientService";
import { formatDate } from "../utils/formatDate";
import { ConsultationService } from "../core/services/ConsultationService";
import { MoonLoader } from "react-spinners";
import ActionButton from "../components/ButtonComponent/ActionButton";
import FormEvolutionHistoryForm from "../components/FormRegister/FormEvolutionHistory";

const PatientRecord: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const patientService = new PatientService();
  const consultationService = new ConsultationService();
  const [patient, setPatient] = useState({ cpf: null, birthDate: null, email: null, phoneNumber: null, fullName: null });
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const formRef = useRef<any>(null); // Ref para o formulário

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const responsePatient = await patientService.getPatientById(Number(id));
        const responseConsultations = await consultationService.findAllByPatientId(Number(id));
        setConsultations(responseConsultations);
        setPatient(responsePatient);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const backToPatientsPage = () => {
    history.push("/pacientes");
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center justify-center mt-10 mr-5 ml-5">
          <div className="max-w-4xl w-full">
            <div className="w-full flex items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              <ActionButton // Botão posicionado à direita
                text="ADICIONAR HISTÓRICO"
                onClick={() => setShowModal(true)}
              />
            </div>



            {loading ? (
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

        {/* Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent>
            <div className="flex flex-col justify-center items-center p-8">
              <FormEvolutionHistoryForm ref={formRef} />
            </div>
            <div className="flex justify-center">

              <ActionButton
                text="SALVAR"
                type="submit"
                onClick={handleSubmit}
              />
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default PatientRecord;