
const Table = () => {
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
            {data.map((item, index) => (
              <tr key={index} className="bg-white">
                <td className="w-2/6 border-t px-4 py-2">{item.data}</td>
                <td className=" border-t px-4 py-2">{item.resumo}</td>
                <td className=" border-t px-4 py-2">{item.proximoPasso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
