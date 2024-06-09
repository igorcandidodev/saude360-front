import React, { useState } from 'react';
import FormSelectButton from './FormSelectButton';
import { Form } from ".";

const FormFinance: React.FC = () => {
  const [financeName, setFinanceName] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicionar lógica para salvar a nova finança
    console.log("Finance Name:", financeName);
    console.log("Amount:", amount);
    console.log("Date:", date);
    console.log("Category:", category);
    console.log("Payment Type:", paymentType);
    console.log("Payment Status:", paymentStatus);
  };

  return (
    <>
      <Form.Header text="Informacões Pessoais" />
      <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col pt-6">
            <label className="pb-2" htmlFor="financeName">Nome da Finança</label>
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
            <label className="pb-2" htmlFor="amount">Valor</label>
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
            <label className="pb-2" htmlFor="date">Data</label>
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
            <label className="pb-0" htmlFor="category">Categoria</label>
            <FormSelectButton
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "entrada", label: "Entrada" },
                { value: "saida", label: "Saída" },
              ]}
              required
            />
          </div>
          <div className="flex flex-col pt-6">
            <label className="pb-0" htmlFor="paymentType">Tipo de Pagamento</label>
            <FormSelectButton
              id="paymentType"
              name="paymentType"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              options={[
                { value: "pix", label: "PIX" },
                { value: "credito", label: "Cartão de Crédito" },
                { value: "debito", label: "Cartão de Débito" },
                { value: "boleto", label: "Boleto" },
                { value: "transferencia", label: "Transferência" },
                { value: "dinheiro", label: "Dinheiro" },
              ]}
              required
            />
          </div>
          <div className="flex flex-col pt-6">
            <label className="pb-0" htmlFor="paymentStatus">Status de Pagamento</label>
            <FormSelectButton
              id="paymentStatus"
              name="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              options={[
                { value: "pendente", label: "Pendente" },
                { value: "concluido", label: "Concluído" },
                { value: "atrasado", label: "Atrasado" },
              ]}
              required
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormFinance;
