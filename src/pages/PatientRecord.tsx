import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";

import { LeftOutlined } from "@ant-design/icons";
import SessionTable from "../components/SessionTable";

const PatientRecord: React.FC = () => {
  const history = useHistory();

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
            <h2 className="text-zinc-600 text-xl font-semibold text-center ">
              Ficha médica
            </h2>
          </div>

          <h2 className="text-zinc-600 text-xl font-semibold mt-6 text-left">
            Informações
          </h2>

          <div className="grid grid-cols-2 gap-1 pr-10 pt-5 lg:flex lg:flex-wrap lg:gap-4">
            <div className="flex flex-col mb-2 lg:w-1/1 ">
              <span className="pb-2 font-semibold">CPF</span>
              <span>000.000.000-00</span>
            </div>
            <div className="flex flex-col mb-2 lg:w-1/1 ">
              <span className="pb-2 font-semibold">Data de nascimento</span>
              <span>DD/MM/AAAA</span>
            </div>
            <div className="flex flex-col mb-2 lg:w-1/1 ">
              <span className="pb-2 font-semibold">EMAIL</span>
              <span>julinha100@gmail.com</span>
            </div>
            <div className="flex flex-col mb-2 lg:w-1/1 ">
              <span className="pb-2 font-semibold">Número de celular</span>
              <span>(00) 00000 - 0000</span>
            </div>
            <div className="flex flex-col mb-2 lg:w-1/1 ">
              <span className="pb-2 font-semibold">
                Frequência de atendimento
              </span>
              <span>1x na semana, Terça-feira às 18h</span>
            </div>
          </div>

          <h2 className="text-zinc-600 text-xl font-semibold mt-6 mb-4 text-left">
            Sessões
          </h2>

          <div className="max-w-4xl w-full mx-auto">
            <SessionTable />
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
  );
};

export default PatientRecord;
