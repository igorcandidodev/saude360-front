import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';


import FilterButton from '../components/FilterButton'
import ContactIcon from "../Images/Icons/contact.svg"

import PatientsTable from '../components/PatientsTable';


const Patients: React.FC = () => {
  return (
    <IonPage className='justify-start'>
      <Menu />
      <div className='h-full flex items-center '>
        

      <div className=' flex flex-col lg:justify-center'>

        <div className='flex justify-center'>
          <div className='flex-col lg:w-3/4 '>
            <h1 className='text-3xl'>Pacientes</h1>
            <div className='flex justify-between'>
              <div className='flex w-full items-center'>
                <IonSearchbar animated={true} placeholder="Pesquise o nome do paciente" className='w-[22rem]'></IonSearchbar>
                <FilterButton />
              </div>
              <Link className="flex items-center bg-blue1 text-white px-4 rounded-md w-80 my-1" to={'/cadastro-paciente'}>
                <img src={ContactIcon} alt="Add" className="mr-2 w-6 h-6" />
                Adicionar novo paciente
              </Link>
            </div>
          </div>


        </div>
        <div className='flex justify-center'>
          <div className='w-full lg:w-3/4'>
            <PatientsTable />
          </div>

        </div>


      </div>
      </div>
    </IonPage>
  );
};

export default Patients;
