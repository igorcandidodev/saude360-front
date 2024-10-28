import { Form } from ".";

export function FormMinorPatient() {
    return (
<>
     <Form.Header text="Dados dos Responsáveis"/>
      <form className="w-80 md:w-10/12 2xl:w-7/12 md:grid md:grid-cols-2 md:gap-3">
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="fullName">
            NOME COMPLETO <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="fullName"
            placeholder="Digite o nome completo"
            name="fullName"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cpf">
            CPF <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cpf"
            name="cpf"
            placeholder="Digite o CPF"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="fullName">
            PARENTESCO <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="kinship"
            placeholder="Digite o parentesco com o paciente"
            name="kinship"
          ></input>
        </div>
      </form>
    </>
    )
}