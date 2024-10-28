import React from 'react';
import { useHistory } from 'react-router-dom';
import ErrorImage from '../../Images/erro404.svg';
import { Form } from '../FormRegister';


const NotFound: React.FC = () => {
  const history = useHistory();

  const handleGoHome = () => {
    history.push('/home');
  };


   return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <img
        src={ErrorImage}
        alt="Página não encontrada"
        className="w-64 mb-8"
      />
      <h1 className="text-2xl font-semibold mb-4">Ocorreu um erro, essa página não existe</h1>

      <Form.ActionButton
        text="RETORNAR AO INÍCIO"
        onClick={handleGoHome}
      /> 
    </div>
  );
};

export default NotFound;
