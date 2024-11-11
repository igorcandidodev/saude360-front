import { lazy, useState, useEffect, Suspense } from "react";
import { getMonth } from "../../util";
import EventModal from "./EventModal";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Sidebar from "./Sidebar/Sidebar";
import Loading from "./Loading";
import AddButton from "./AddButton";
import MobileMenu from "./Header/MobileMenu";
import Menu from "../Menu";
import { IonPage } from "@ionic/react";
import { PatientsProvider } from "../../context/PatientsContext";
import { ConsultationProvider } from "../../context/ConsultationContext";

// Lazy Loaded Components
const Appointments = lazy(() => import("./Appointments/Appointments"));
const DayCalender = lazy(() => import("./Day/DayCalender"));
const Week = lazy(() => import("./Week/Week"));
const Month = lazy(() => import("./Month/Month"));

const MainEntry = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {
    monthIndex,
    showEventModal,
    showSideCalender,
    viewCalender,
    daySelected,
    setViewCalender,
  } = useContext(GlobalContext);

  // Garantir que a visualização seja sempre 'Month' ao carregar a página
  useEffect(() => {
    if (viewCalender !== "Month") {
      setViewCalender("Month");
    }
  }, []);

  // Atualizar mês atual se o índice global de mês mudar
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  // Definir o mês atual se o dia selecionado mudar, principalmente no sideCalendar
  useEffect(() => {
    setCurrentMonth(getMonth(daySelected.month()));
  }, [daySelected]);

  return (
    <ConsultationProvider>
      <PatientsProvider>
        <IonPage>
          <div>
            <Menu />
          </div>

          {/* Modal de Eventos para lidar com nossos compromissos */}
          {showEventModal && <EventModal />}

          <div className="h-screen flex flex-col relative mt-3 md:mt-0">
            <div className="mobileScreenView">{/* <MobileMenu /> */}</div>
            <div className="flex flex-1 monthCalender">
              <div className="hiddenItemsSmallScreen flex">
                {showSideCalender && <Sidebar />}
              </div>

              <Suspense fallback={<Loading />}>
                {viewCalender === "Month" ? (
                  <Month month={currentMonth} />
                ) : viewCalender === "Week" ? (
                  <Week />
                ) : viewCalender === "Day" ? (
                  <DayCalender />
                ) : (
                  <Appointments />
                )}
              </Suspense>
            </div>
            <AddButton />
          </div>
        </IonPage>
      </PatientsProvider>
    </ConsultationProvider>
  );
};

export default MainEntry;
