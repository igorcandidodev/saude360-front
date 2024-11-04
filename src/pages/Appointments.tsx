import { IonIcon, IonPage } from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import Menu from "../components/Menu";
import CalendarGreen from '../Images/Icons/calendarGreen.svg';
import CalendarYellow from '../Images/Icons/calendarYellow.svg';
import CalendarRed from '../Images/Icons/calendarRed.svg';
import { ConsultationService } from "../core/services/ConsultationService";

const Appointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const consultationService = new ConsultationService();

  useEffect(() => {
    consultationService.findAllByPatient().then((data) => {
      const upcoming = data.filter((appointment: any) => new Date(appointment.startServiceDateAndTime) >= new Date());
      const history = data.filter((appointment: any) => new Date(appointment.startServiceDateAndTime) < new Date());

      setUpcomingAppointments(upcoming);
      setAppointmentHistory(history);
    }).catch((error) => {
      console.error("Erro ao buscar as consultas:", error);
    });
  }, []); 

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return { icon: CalendarYellow, text: "Agendada" };
      case "CONCLUDED":
        return { icon: CalendarGreen, text: "Concluída" };
      case "CANCELED":
        return { icon: CalendarRed, text: "Cancelada" };
      default:
        return { icon: CalendarYellow, text: "Indefinido" };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); 
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const year = date.getUTCFullYear(); 
    const hours = String(date.getUTCHours()).padStart(2, '0'); 
    const formattedDate = `${day}/${month}/${year} às ${hours}h`; 
  
    return formattedDate;
  };

  const AppointmentItem = ({ appointment }: { appointment: any }) => {
    const { icon, text } = getStatusDetails(appointment.statusConsultation);

    return (
      <li key={appointment.id} className="border p-4 rounded-md shadow-sm">
        <div className="flex items-center space-x-2">
          <IonIcon icon={icon} className="w-12 h-12 fill-gray2" />
          <div>
            <p className="font-semibold text-lg">{text} - Consulta: {appointment.title}</p>
            <p className="font-semibold text-lg">Data: {formatDate(appointment.startServiceDateAndTime)}</p>
          </div>
        </div>
      </li>
    );
  };

  return (
    <IonPage className="justify-start" style={{ overflowY: "auto" }}>
      <Menu />
      <div className="flex items-center mt-5">
        <div className="flex flex-col w-full">
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4">
              <div className="flex mb-6">
                <button
                  className={`w-1/2 px-4 py-3 text-lg font-semibold border ${
                    activeTab === "upcoming"
                      ? "bg-[#0443BE] text-white"
                      : "bg-white text-black border-grey"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Próximas Consultas
                </button>
                <button
                  className={`w-1/2 px-4 py-3 text-lg font-semibold border ${
                    activeTab === "history"
                      ? "bg-[#0443BE] text-white"
                      : "bg-white text-black border-grey"
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  Histórico de Atendimento
                </button>
              </div>

              <div>
                {activeTab === "upcoming" ? (
                  <ul className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <AppointmentItem key={appointment.id} appointment={appointment} />
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-4">
                    {appointmentHistory.map((appointment) => (
                      <AppointmentItem key={appointment.id} appointment={appointment} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default Appointments;