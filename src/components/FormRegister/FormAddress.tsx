import { Form } from ".";

export function FormAddress() {
    return (
<>
     <Form.Header text="Endereço Consultório"/>
      <form className="w-80">
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cep">
            CEP
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cep"
            placeholder="00000-000"
            name="cep"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="road">
            RUA
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="road"
            name="road"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="dateBirthday">
            NÚMERO
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="number"
            name="number"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="email">
           COMPLEMENTO (OPCIONAL)
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="complement"
            name="complement"
          ></input>
        </div>

        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="neighborhood">
            BAIRRO
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="neighborhood"
            name="neighborhood"
          ></input>
        </div>

        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="city">
            CIDADE
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="city"
            name="city"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="state">
            ESTADO
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="state"
            name="state"
          ></input>
        </div>
      </form>
    </>
    )
}