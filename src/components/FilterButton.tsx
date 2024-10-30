import React from 'react';
import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPopover } from '@ionic/react';
import { funnel } from 'ionicons/icons';
import { usePatientsTable } from '../context/PatientsTableContext';

function FilterButton() {
  const { filterPatients } = usePatientsTable(); // Use o contexto

  return (
    <>
      <button id="popover-button" className='bg-white border-solid rounded-md border-2 w-11 h-11 border-gray-300'>
        <IonIcon icon={funnel} className='size-6 cursor-pointer text-black'></IonIcon>
      </button>
      <IonPopover trigger="popover-button" dismissOnSelect={true}>
        <IonContent>
          <IonList>
            <IonItem button={true} detail={false} onClick={() => filterPatients('asc')}>
              Ordenar A-Z
            </IonItem>
            <IonItem button={true} detail={false} onClick={() => filterPatients('desc')}>
              Ordenar Z-A
            </IonItem>
            <IonItem button={true} detail={false} onClick={() => filterPatients('dataConsulta', 'asc')}>
              Ordenar próxima consulta
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
}

export default FilterButton;
