import React from 'react';

import MessageIcon from "../Images/Icons/Message.svg"
import NoteIcon from "../Images/Icons/note.svg"

const Table = () => {
  // Dados de exemplo para preencher a tabela
  const data = [
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },
    { paciente: 'JULIA ROCHA COELHO', proximaConsulta: '25/03/2024', ultimoEnvioTarefa: '08/04/2024', ultimoFeedback: '10/04/2024' },

    // P/ adicionar mais dados 
  ];

  return (
    <div className="rounded-lg overflow-hidden border max-h-500px">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-black text-white">
            <tr>
              <th className="w-2/6 px-4 py-2 rounded-tl-lg text-left">Paciente</th>
              <th className=" px-4 py-2 text-left">Próxima Consulta</th>
              <th className=" px-4 py-2 text-left">Último Envio de Tarefa</th>
              <th className=" px-4 py-2 text-left">Último Feedback</th>
              <th className=" rounded-tr-lg"></th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="overflow-x-auto" style={{maxHeight: '480px'}}>
        <table className="w-full table-fixed">
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="bg-white">
                <td className="w-2/6 border-t px-4 py-2">{item.paciente}</td>
                <td className=" border-t px-4 py-2">{item.proximaConsulta}</td>
                <td className=" border-t px-4 py-2">{item.ultimoEnvioTarefa}</td>
                <td className="border-t px-4 py-2">{item.ultimoFeedback}</td>
                <td className="border-t px-4 py-2 flex justify-center gap-3">
                    <img src={MessageIcon} alt="" />
                    <img src={NoteIcon} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
