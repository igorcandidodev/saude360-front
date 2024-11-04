import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Menu from '../components/Menu';
import FilterButton from '../components/FilterButton';
import PatientsTable from '../components/PatientsTable';
import { PatientsTableProvider } from '../context/PatientsTableContext';
import { useHistory } from 'react-router-dom';
import ActionButton from '../components/ButtonComponent/ActionButton';

const Patients: React.FC = () => {

  const history = useHistory();

  const addNewPatient = () => {
    history.push('/cadastro-paciente');
  };

  return (
    <PatientsTableProvider> {/* Envolvendo toda a página com o Provider */}
      <IonPage className='justify-start'>
        <Menu />
        <div className='h-full flex items-start mt-10'>
          <div className='flex flex-col lg:justify-center'>
            <div className='flex justify-center'>
              <div className='flex-col w-full mx-5 lg:w-3/4 mt-10 lg:mt-0'>
                <h1 className='text-3xl'>Pacientes</h1>
                <div className='flex justify-between'>
                  <div className='flex w-2/5 lg:w-full items-center'>
                    <IonSearchbar animated={true} placeholder="Pesquise o nome do paciente" className='w-[22rem]'></IonSearchbar>
                    <FilterButton /> {/* Este componente agora tem acesso ao contexto */}
                  </div>
                  <ActionButton
                    text="ADICIONAR NOVO PACIENTE"
                    onClick={addNewPatient}
                  />
                </div>
              </div>
            </div>
            <div className='flex w-screen overflow-scroll p-5 justify-center'>
              <div className='w-full lg:mx-0 lg:w-3/4 '>
                <PatientsTable /> {/* Este componente também tem acesso ao contexto */}
              </div>
            </div>
          </div>
        </div>
      </IonPage>
    </PatientsTableProvider>
  );
};

export default Patients;
