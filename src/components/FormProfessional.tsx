import React from "react";


const Form: React.FC = () => {
  return (
    <div className="w-90 flex items-center justify-center">
      <form className="w-80">
        <div>
            <h2 className="text-zinc-600 text-center text-xl font-semibold">Informações Pessoais</h2>
            <hr className="mt-4" />
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="fullName">NOME COMPLETO</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="fullName"
            name="fullName"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cpf">CPF</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cpf"
            name="cpf"
            placeholder="000.000.000-00"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="dateBirthday">DATA DE NASCIMENTO</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="date"
            id="dateBirthday"
            name="dateBirthday"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="email">E-MAIL</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="email"
            id="fullName"
            name="fullName"
          ></input>
        </div>

        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cellphone">NÚMERO DE CELULAR</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cellphone"
            name="cellphone"
            placeholder="(00) 90000-0000"
          ></input>
           <p className="text-xs text-zinc-400 pt-2">Não coloque símbolos</p>
        </div>

        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="helthSector">ÁREA DE TRABALHO</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="helthSector"
            name="helthSector"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cns">NÚMERO CNS</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cns"
            name="cns"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="password">SENHA</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="password"
            id="password"
            name="password"
          ></input>
          <p className="text-xs text-zinc-400 pt-2">No mínimo 8 caracteres, com pelo menos 1 letra maiúscula</p>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="passwordConfirm">CONFIRMAR SENHA</label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="passwordConfirm"
            id="password"
            name="passwordConfirm "
          ></input>
          <p className="text-xs text-zinc-400 pt-2">No mínimo 8 caracteres, com pelo menos 1 letra maiúscula</p>
        </div>
        
        <button className="bg-blue-600 rounded mt-10 mb-12 pr-5 pl-5 pt-3 pb-3 w-full font-semibold text-lg text-white">PRÓXIMO</button>
        
      </form>
    </div>
  );
};

export default Form;
