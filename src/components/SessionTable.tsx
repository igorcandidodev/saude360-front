import { formatDateTime } from "../utils/formatDateAndTime";

interface TableProps {
    consultations: any[];
}

const Table = ( { consultations } : TableProps) => {
  const data = [
    { data: '25/03/2024', resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget. ', proximoPasso: 'Lorem ipsum dolor sit amet' },
    { data: '25/03/2024', resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget. ', proximoPasso: 'Lorem ipsum dolor sit amet' },
    { data: '25/03/2024', resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget. ', proximoPasso: 'Lorem ipsum dolor sit amet' },
    { data: '25/03/2024', resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget. ', proximoPasso: 'Lorem ipsum dolor sit amet' },
    { data: '25/03/2024', resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget. ', proximoPasso: 'Lorem ipsum dolor sit amet' },
    { data: '25/03/2024', resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget. ', proximoPasso: 'Lorem ipsum dolor sit amet' },
    { data: '25/03/2024', resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam nulla in euismod facilisis. Mauris finibus feugiat nibh, ac ultrices risus venenatis eget. ', proximoPasso: 'Lorem ipsum dolor sit amet' },
  ];

  return (
    <div className="rounded-lg overflow-hidden border max-h-500px">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-gray1 text-white">
            <tr>
              <th className="w-2/6 px-4 py-2 rounded-tl-lg text-left">DATA</th>
              <th className=" px-4 py-2 text-left">RESUMO DA SESSÃO</th>
              <th className=" px-4 py-2 text-left">PRÓX. PASSOS</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="overflow-x-auto" style={{maxHeight: '480px'}}>
        <table className="w-full table-fixed">
          <tbody>
            {consultations.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Nenhuma consulta encontrada.
                </td>
              </tr>
            ) : (
              consultations.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="w-2/6 border-t px-4 py-2">{item?.date != null ? formatDateTime(item?.date) : null}</td>
                  <td className=" border-t px-4 py-2">{item?.title}</td>
                  <td className=" border-t px-4 py-2">{item?.evolutionHistory != null ? item.evolutionHistory.nextSteps : "N/A"}</td>
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
