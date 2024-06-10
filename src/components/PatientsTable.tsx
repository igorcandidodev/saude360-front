import React from 'react';
import { useHistory } from 'react-router-dom';
import MessageIcon from "../Images/Icons/Message.svg";
import NoteIcon from "../Images/Icons/note.svg";
import { usePatientsTable } from '../context/PatientsTableContext';
import { formatDate } from "../utils/formatDate";
import { formatDateTime } from "../utils/formatDateAndTime";

const Table = () => {
  const { patients } = usePatientsTable();
  const history = useHistory();

  const handleNoteClick = (patientId: number) => {
    history.push(`/ficha-pacientes/${patientId}`);
  };

  const handlePostsClick = (patientId: number) => {
    history.push(`/posts/${patientId}`);
  };

  return (
    <div className="rounded-lg overflow-hidden border max-h-[500px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed">
          <thead className="bg-gray1 text-white">
            <tr>
              <th className="w-2/6 px-4 py-2 rounded-tl-lg text-left">Paciente</th>
              <th className="px-4 py-2 text-left">Próxima Consulta</th>
              <th className="px-4 py-2 text-left">Último Envio de Tarefa</th>
              <th className="px-4 py-2 text-left">Último Feedback</th>
              <th className="rounded-tr-lg"></th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="overflow-x-auto max-h-[450px]">
        <table className="w-full min-w-[800px] table-fixed">
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Nenhum paciente encontrado.
                </td>
              </tr>
            ) : (
              patients.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100 focus:bg-gray-200">
                  <td className="w-2/6 border-t px-4 py-2">{item.paciente}</td>
                  <td className="border-t px-4 py-2">{formatDateTime(item.dataConsulta)}</td>
                  <td className="border-t px-4 py-2">{formatDateTime(item.ultimoEnvio)}</td>
                  <td className="border-t px-4 py-2">{formatDateTime(item.ultimoFeedback)}</td>
                  <td className="border-t px-4 py-2 flex justify-center gap-3">
                    <img src={MessageIcon} alt="Ícone de mensagem" onClick={() => handlePostsClick(item.id)} className="cursor-pointer" />
                    <img 
                      src={NoteIcon} 
                      alt="Ícone de nota" 
                      onClick={() => handleNoteClick(item.id)} 
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
