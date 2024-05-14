import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonImg,IonIcon, IonMenuToggle,IonItem, IonList, IonItemGroup, IonItemOption, IonLabel } from '@ionic/react';

/* logo */
import Logo from  "../Images/Logo Saude360.svg"

/* Icons */
import { calendarOutline, closeOutline } from 'ionicons/icons';
import CalendarIcon from  "../Images/Icons/calendar.svg"


function Menu() {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar className='w-full flex flex-col text-center justify-center px-5 items-center'>
          <IonMenuToggle slot='end'>
              <IonIcon icon={closeOutline} className='size-6 cursor-pointer text-slate-950 '></IonIcon>
          </IonMenuToggle>
            <IonImg className='w-full px-4 flex  '
              src={Logo}
              alt="Logo"
            ></IonImg>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonList lines="none" >
        <IonItem >
          <IonIcon icon={calendarOutline} className='size-6 cursor-pointer text-slate-400 '></IonIcon>
          <IonLabel>Agendamentos</IonLabel>
        </IonItem>
        <IonItem>
        <IonIcon icon={calendarOutline} className='size-6 cursor-pointer text-slate-400 '></IonIcon>
          <IonLabel>Pacientes</IonLabel>
        </IonItem>
        <IonItem>
        <IonIcon icon={calendarOutline} className='size-6 cursor-pointer text-slate-400 '></IonIcon>
          <IonLabel>Financeiro</IonLabel>
        </IonItem>
        <IonItem>
        <IonIcon icon={calendarOutline} className='size-6 cursor-pointer text-slate-400 '></IonIcon>
          <IonLabel>Notificações</IonLabel>
        </IonItem>
        <IonItem>
        <IonIcon icon={calendarOutline} className='size-6 cursor-pointer text-slate-400 '></IonIcon>
          <IonLabel>Configurações</IonLabel>
        </IonItem>
      </IonList>


        </IonContent>
      </IonMenu>
      <div id="main-content">

            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
      </div>
    </>
  );
}
export default Menu;