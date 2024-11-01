import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

  const getStatusClass = (status) => {
    switch (status) {
      case 'CONCLUDED':
        return 'bg-green-100 text-green-600 border border-green-600 rounded-lg px-2 py-1';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-600 border border-yellow-600 rounded-lg px-2 py-1';
      case 'LATE':
        return 'bg-red-100 text-red-600 border border-red-600 rounded-lg px-2 py-1';
      default:
        return '';
    }
  }



  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'PIX':
        return 'PIX';
      case 'CREDIT_CARD':
        return 'Cartão de Crédito';
      case 'DEBIT_CARD':
        return 'Cartão de Débito';
      case 'CASH':
        return 'Dinheiro';
    }
  };

  const getPaymentStatusLabel = (method) => {
    switch (method) {
      case 'PENDING':
        return 'Pendente';
      case 'CONCLUDED':
        return 'Concluído';
      case 'LATE':
        return 'Atrasado';
    }
  };

  const getTransactionTypeLabel = (method) => {
    switch (method) {
      case 'INCOME':
        return 'Entrada';
      case 'EXPENSE':
        return 'Saída';
    }
  };

 
  const FinanceTable = ({ transactions }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (transactions.length > 0) {
        setLoading(false);
      }
    }, [transactions]);

     return (
    <div className="rounded-lg overflow-hidden border">
      {loading ? (
        <div className="flex justify-center items-center h-full py-8">
          <MoonLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed">
          <thead className="bg-gray1 text-white">
            <tr>
              <th className="px-4 py-2 text-left">NOME</th>
              <th className="px-4 py-2 text-left">TIPO</th>
              <th className="px-4 py-2 text-left">VALOR</th>
              <th className="px-4 py-2 text-left">DATA</th>
              <th className="px-4 py-2 text-left">TIPO DE PAGAMENTO</th>
              <th className="px-4 py-2 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-left">{transaction.name}</td>
                  <td className="px-4 py-2 text-left">{getTransactionTypeLabel(transaction.transactionType)}</td>
                  <td className="px-4 py-2 text-left">{transaction.value.toFixed(2)}</td>
                  <td className="px-4 py-2 text-left">{transaction.date}</td>
                  <td className="px-4 py-2 text-left">{getPaymentMethodLabel(transaction.paymentMethod)}</td>
                  <td className="px-4 py-2 text-left">
                    <span className={getStatusClass(transaction.paymentStatus)}>
                      {getPaymentStatusLabel(transaction.paymentStatus)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};



export { FinanceTable };
