import React, { useState, forwardRef, useImperativeHandle } from 'react';
import FormSelectButton from './FormSelectButton';
import { Form } from ".";

const FormFinance = forwardRef((props: any, ref) => {
  const [financeName, setFinanceName] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useImperativeHandle(ref, () => ({
    submit: () => {
      const formData = {
        name: financeName,
        value: amount,
        date: `${date}T00:00:00Z`,
        transactionType: category,
        paymentMethod: paymentType,
        paymentStatus: paymentStatus,
      };
      props.onSubmit(formData);
    },
  }));

  

  return (
    <>
      <Form.Header text="Informacões" />
      <form className="w-full max-w-4xl mx-auto" >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col pt-6">
            <label className="pb-2" htmlFor="financeName">Nome <span className="text-red-500">*</span> </label>
            <input
              className="w-full border border-zinc-400 p-2 rounded"
              type="text"
              id="financeName"
              name="financeName"
              placeholder="Digite o nome da finança"
              value={financeName}
              onChange={(e) => setFinanceName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col pt-6">
            <label className="pb-2" htmlFor="amount">Valor <span className="text-red-500">*</span> </label>
            <input
              className="w-full border border-zinc-400 p-2 rounded"
              type="number"
              id="amount"
              name="amount"
              placeholder="Digite o valor"
              min="0"
              value={amount !== null ? amount : ""}
              onChange={(e) => setAmount(e.target.valueAsNumber)}
              required
            />
          </div>
          <div className="flex flex-col pt-6">
            <label className="pb-2" htmlFor="date">Data <span className="text-red-500">*</span> </label>
            <input
              className="w-full border border-zinc-400 p-2 rounded h-11"
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col pt-6">
            <label className="pb-0" htmlFor="category">Categoria <span className="text-red-500">*</span> </label>
            <FormSelectButton
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "INCOME", label: "Entrada" },
                { value: "EXPENSE", label: "Saída" },
              ]}
              required
            />
          </div>
          <div className="flex flex-col pt-6">
            <label className="pb-0" htmlFor="paymentType">Tipo de Pagamento <span className="text-red-500">*</span> </label>
            <FormSelectButton
              id="paymentType"
              name="paymentType"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              options={[
                { value: "PIX", label: "PIX" },
                { value: "CREDIT_CARD", label: "Cartão de Crédito" },
                { value: "DEBIT_CARD", label: "Cartão de Débito" },
                { value: "CASH", label: "Dinheiro" },
              ]}
              required
            />
          </div>
          <div className="flex flex-col pt-6">
            <label className="pb-0" htmlFor="paymentStatus">Status de Pagamento <span className="text-red-500">*</span> </label>
            <FormSelectButton
              id="paymentStatus"
              name="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              options={[
                { value: "PENDING", label: "Pendente" },
                { value: "CONCLUDED", label: "Concluído" },
                { value: "LATE", label: "Atrasado" },
              ]}
              required
            />
          </div>
        </div>
      </form>
    </>
  );
});

export default FormFinance;
