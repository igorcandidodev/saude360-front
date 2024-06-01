import React from 'react';

import MessageIcon from "../Images/Icons/Message.svg"
import NoteIcon from "../Images/Icons/note.svg"


  // Dados de exemplo para preencher a tabela
  const data = [
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.45, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Saída', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 200.00, financeDate: '10/04/2024' },
    { financeNote: 'CONSULTA JULIA ROCHA COELHO', financeType: 'Entrada', financeValue: 400.00, financeDate: '10/04/2024' },


    // P/ adicionar mais dados 
  ];

  const FinanceTable: React.FC = () => {
    return (
      <div className="rounded-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray1 text-white">
            <tr>
                <th className="w-2/6 px-4 py-2 rounded-tl-lg text-left">Nome</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Valor</th>
                <th className="px-4 py-2 text-left">Data</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full table-fixed">
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-white">
                <td className="w-2/6 border-t px-4 py-2">{item.financeNote}</td>
                <td className="border-t px-4 py-2">{item.financeType}</td>
                <td className="border-t px-4 py-2">R$ {item.financeValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="border-t px-4 py-2">{item.financeDate}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
    /* return (
      <div className="rounded-lg overflow-hidden border ">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray1 text-white">
              <tr>
                <th className="w-2/6 px-4 py-2 rounded-tl-lg text-left">Nome</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Valor</th>
                <th className="px-4 py-2 text-left">Data</th>
              </tr>
            </thead>
            <div className="overflow-x-auto" style={{maxHeight: '480px'}}>
        <table className="w-full table-fixed">
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="w-2/6 border-t px-4 py-2">{item.financeNote}</td>
                  <td className="border-t px-4 py-2">{item.financeType}</td>
                  <td className="border-t px-4 py-2">R$ {item.financeValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="border-t px-4 py-2">{item.financeDate}</td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>
          </table>
        </div>
      </div>
    );
  }; */

export { FinanceTable, data };