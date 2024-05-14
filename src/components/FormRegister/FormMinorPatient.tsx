import { Form } from ".";

export function FormMinorPatient() {
    return (
<>
     <Form.Header text="Dados dos Responsáveis"/>
      <form className="w-80 md:w-10/12 2xl:w-7/12 md:grid md:grid-cols-2 md:gap-3">
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="fullName">
            NOME COMPLETO
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="fullName"
            name="fullName"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cpf">
            CPF
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cpf"
            name="cpf"
            placeholder="000.000.000-00"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="fullName">
            PARENTESCO
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="kinship"
            name="kinship"
          ></input>
        </div>
      </form>
    </>
    )
}