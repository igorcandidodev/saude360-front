import React from 'react';
import { data } from './FinanceTable';

const FinanceBalance: React.FC = () => {
  const entrada = data
    .filter(item => item.financeType === 'Entrada')
    .reduce((total, item) => total + item.financeValue, 0);

  const saida = data
    .filter(item => item.financeType === 'Saída')
    .reduce((total, item) => total + item.financeValue, 0);

  const balanco = entrada - saida;

  return (
    <div className="p-5  lg:p-10 bg-white w-screen rounded-lg">
      <div className="flex justify-center  lg:justify-around gap-4">
        <div className="text-center w-1/3">
          <h2 className="text-lg font-semibold">Entrada</h2>
          <p className="text-lg lg:text-3xl">R$ {entrada.toFixed(2).replace('.', ',')}</p>
        </div>
        <div className="text-center w-1/3 lg:border-x-2 lg:border-gray-300">
          <h2 className="text-lg font-semibold">Saída</h2>
          <p className="text-lg lg:text-3xl">R$ {saida.toFixed(2).replace('.', ',')}</p>
        </div>
        <div className="text-center w-1/3">
          <h2 className="text-lg font-semibold">Balanço</h2>
          <p className="text-lg lg:text-3xl">R$ {balanco.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>
    </div>
  );
};

export default FinanceBalance;
