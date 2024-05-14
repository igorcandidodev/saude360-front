import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonImg,IonIcon, IonMenuToggle,IonItem, IonList, IonItemGroup, IonItemOption, IonLabel } from '@ionic/react';

/* logo */
import Logo from  "../Images/Logo Saude360.svg"

/* Icons */
import { calendarOutline, closeOutline } from 'ionicons/icons';
import CalendarIcon from  "../Images/Icons/calendar.svg"


const routes = {
  appPages: [
    { title: 'Agendamentos', path: '/agendamentos', icon: CalendarIcon },
    { title: 'Pacientes', path: '/pacientes', icon: CalendarIcon },
    { title: 'Financeiro', path: '/financeiros', icon: CalendarIcon },
    { title: 'Notificações', path: '/notificacoes', icon: CalendarIcon },
    { title: 'Configurações', path: '/configuracoes', icon: CalendarIcon }
  ]
}



function Menu() {
  return (
    <>
      <IonMenu contentId="main-content" >
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
        {routes.appPages.map((item, index) => (
          <IonItem key={index} routerLink={item.path} >
            <IonIcon icon={item.icon} className='size-6 cursor-pointer text-slate-400 '></IonIcon>
            <IonLabel>{item.title}</IonLabel>
         </IonItem>
           ))}
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