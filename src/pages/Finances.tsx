import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';


import FilterButton from '../components/FilterButton'
import ContactIcon from "../Images/Icons/contact.svg"

import { FinanceTable } from '../components/FinanceTable';
import FinanceBalance from '../components/FinanceBalance';


const Finances: React.FC = () => {
  return (
    <IonPage className='justify-start px-5 bg-gray3'>
      <Menu />
      <div className='h-screen flex items-start mt-20 lg:mt-10 '>
        

      <div className=' flex flex-col w-full lg:justify-center'>

        <div className='flex justify-center '>
          <div className='flex-col  lg:w-3/4 '>
            <div className='flex justify-between mx-5 lg:mx-0 h-14 '>
            <h1 className='text-3xl'>Fanceiro</h1>
              <Link className="flex items-center justify-center bg-blue1 text-white px-4 rounded-md w-48 my-1" to={'#'}>
                Adicionar novo
              </Link>
            </div>
            <div className='flex justify-center'>
            <FinanceBalance/>
            </div>

          </div>


        </div>
        <div className='flex justify-center'>
          <div className='w-full lg:w-3/4'>
            <FinanceTable />
          </div>

        </div>


      </div>
      </div>
    </IonPage>
  );
};

export default Finances;
