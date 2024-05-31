import React, { useState } from 'react';
import Logo from '../Images/Logo Saude360.svg';
import { IonIcon } from '@ionic/react';


import CalendarIcon from '../Images/Icons/calendar.svg';
import { menuOutline, closeOutline } from 'ionicons/icons';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const routes = {
    appPages: [
      { title: 'Agendamentos', path: '/', icon: CalendarIcon },
      { title: 'Pacientes', path: '/pacientes', icon: CalendarIcon },
      { title: 'Financeiro', path: '/financeiros', icon: CalendarIcon },
      { title: 'Notificações', path: '/notificacoes', icon: CalendarIcon },
      { title: 'Configurações', path: '/configuracoes', icon: CalendarIcon },
    ],
  };

  return (
    <div className=" z-50">
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-gray-600 opacity-50"
          onClick={toggleMenu}
        ></div>
      )}

      <div
        className={`transform-gpu z-[100] transition-transform duration-300 bg-white w-64 h-full shadow-lg fixed top-0 left-0 overflow-y-auto ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4 h-90">
          <div className="flex flex-row-reverse">
            <button
              className=" focus:outline-none focus:text-gray-500 hover:bg-gray-50 text-gray-500 p-3 rounded-full "
              onClick={toggleMenu}
            >
              <IonIcon icon={closeOutline} className="w-6 h-6 fill-gray2"></IonIcon>
            </button>
          </div>
          <div className='flex flex-col justify-between h-full'>
            <div>
              <div>
                <a href="/home">
                <img src={Logo} alt="Logo Saude360" className="h- w-auto mx-auto" />
                </a>
              </div>
              <nav className="mt-8">
                <ul>
                  {routes.appPages.map((route, index) => (
                    <li key={index}>
                      <a
                        href={route.path}
                        className="flex items-center px-4 py-2 text-gray-800 bg-menu-color hover:rounded-md hover:text-white"
                      >
                        <IonIcon icon={route.icon} className="w-6 h-6 mr-2 fill-gray2"></IonIcon>
                        {route.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div>
              <a
                href="/login"
                className="flex items-center px-4 py-2 text-gray-800 bg-menu-color hover:rounded-md hover:text-white"
              >
                <IonIcon icon={closeOutline} className="w-6 h-6 mr-2 fill-gray2"></IonIcon>
                Sair
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Button */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 hover:bg-gray-50 text-color-blue1 p-3 rounded-full focus:outline-none"
          onClick={toggleMenu}
        >
          <IonIcon icon={menuOutline} className="w-6 h-6 fill-gray2"></IonIcon>
        </button>
      )}
    </div>
  );
};

export default SideMenu;
