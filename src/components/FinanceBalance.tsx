import React from 'react';
import { data } from './FinanceTable';
import ArrowUpIcon from '../Images/Icons/arrowUp.svg';
import ArrowDownIcon from '../Images/Icons/arrowDown.svg';
import DollarSignArrowIcon from '../Images/Icons/dollarSignArrow.svg';
import { IonIcon } from '@ionic/react';
import { MoonLoader } from 'react-spinners'; 


const FinanceBalance = ({ transactions, loading }) => {

  if (loading) {
    return (
      <div className="flex justify-center items-center p-5">
        <MoonLoader color="#4A90E2" size={40} />
      </div>
    );
  }

  const entrada = transactions
    .filter(item => item.transactionType === 'INCOME')
    .reduce((total, item) => total + item.value, 0);

  const saida = transactions
    .filter(item => item.transactionType === 'EXPENSE')
    .reduce((total, item) => total + item.value, 0);

  const balanco = entrada - saida;

  return (
    <div className="p-5  lg:p-10 bg-white w-screen rounded-lg">
      <div className="flex justify-center  lg:justify-around gap-4">
        <div className="text-center w-1/3 " >
          <div className="flex items-center justify-center">
            <IonIcon icon={ArrowUpIcon} className="w-6 h-6 fill-gray2"></IonIcon>
            <h2 className="text-lg font-semibold text-[#27AE60] ml-2">ENTRADAS</h2>
          </div>
          <p className="text-lg lg:text-3xl">R$ {entrada.toFixed(2).replace('.', ',')}</p>
        </div>
        <div className="text-center w-1/3 lg:border-x-2 lg:border-gray-300">
          <div className="flex items-center justify-center">
            <IonIcon icon={ArrowDownIcon} className="w-6 h-6 fill-gray2"></IonIcon>
            <h2 className="text-lg font-semibold text-[#EB5757] ml-2">SAÍDAS</h2>
          </div>
          <p className="text-lg lg:text-3xl">R$ {saida.toFixed(2).replace('.', ',')}</p>
        </div>
        <div className="text-center w-1/3">
          <div className="flex items-center justify-center">
            <IonIcon icon={DollarSignArrowIcon} className="w-6 h-6 fill-gray2"></IonIcon>
            <h2 className="text-lg font-semibold">BALANÇO</h2>
          </div> 
          <p className="text-lg lg:text-3xl">R$ {balanco.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
    </div>
  );
};

export default FinanceBalance;
