import React, { useState } from 'react';
import CalendarIcon from '../Images/Icons/calendar.svg';
import Logo from '../Images/Logo Saude360.svg';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const routes = {
    appPages: [
      { title: 'Agendamentos', path: '/agendamentos', icon: CalendarIcon },
      { title: 'Pacientes', path: '/pacientes', icon: CalendarIcon },
      { title: 'Financeiro', path: '/financeiros', icon: CalendarIcon },
      { title: 'Notificações', path: '/notificacoes', icon: CalendarIcon },
      { title: 'Configurações', path: '/configuracoes', icon: CalendarIcon },
    ],
  };

  return (
    <div className=" z-50">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 opacity-50"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Side Menu */}
      <div
        className={`transform-gpu transition-transform duration-300 bg-white w-64 h-full shadow-lg fixed top-0 left-0 overflow-y-auto ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex flex-row-reverse">
            <button
              className="text-gray-800 focus:outline-none focus:text-gray-500"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4">
            <img src={Logo} alt="Logo Saude360" className="h- w-auto mx-auto" />
          </div>
          <nav className="mt-8">
            <ul>
              {routes.appPages.map((route, index) => (
                <li key={index}>
                  <a
                    href={route.path}
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-700 hover:text-color-white"
                  >
                    <img src={route.icon} alt="Ícone" className="w-6 h-6 mr-2" />
                    {route.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Button */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 hover:bg-gray-50 text-color-blue1 p-3 rounded-full focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SideMenu;
