import { Form } from "."

export default function FormDataClinic() {
  return (
    <>
      <Form.Header text="Dados do Consultório" />
      <form className="w-80">
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cnpj">
            CNPJ
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cnpj"
            placeholder="000.000/0000-00"
            name="cnpj"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cnes">
            NÚMERO CNES
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cnes"
            name="cnes"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cellphone">
            CELULAR
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cellphone"
            name="cellphone"
            placeholder="(00) 90000-0000"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="phone">
            TELEFONE (OPCIONAL)
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="phone"
            name="phone"
            placeholder="(00) 0000-0000"
          ></input>
        </div>
      </form>
    </>
  );
}
