import React from 'react';
import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPopover } from '@ionic/react';

import { funnel } from 'ionicons/icons';

function FilterButton() {
  return (
    <>
 
      <button id="popover-button" className='bg-white border-solid rounded-md  border-2 w-11 h-11 border-gray-300'><IonIcon icon={funnel} className='size-6 cursor-pointer text-black '></IonIcon></button>
      <IonPopover trigger="popover-button" dismissOnSelect={true}>
        <IonContent>
          <IonList>
            <IonItem button={true} detail={false}>
              Ordenar A-Z
            </IonItem>
            <IonItem button={true} detail={false}>
              Ordernar proxima consulta
            </IonItem>

            <IonPopover trigger="nested-trigger" dismissOnSelect={true} side="end">
              <IonContent>
                <IonList>
                  <IonItem button={true} detail={false}>
                    Nested option
                  </IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
}
export default FilterButton;