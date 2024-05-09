import { Form } from ".";
import { IonImg } from "@ionic/react";

import IconInterrogacao from "../../Images/Icons/IconInterrogacao.svg";
import IconDown from "../../Images/Icons/IconDown.svg";

export default function FormPersonalInformation() {
  return (
    <>
      <Form.Header text="Informacões Pessoais" />
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
          <label className="pb-2" htmlFor="dateBirthday">
            DATA DE NASCIMENTO
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="date"
            id="dateBirthday"
            name="dateBirthday"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="email">
            E-MAIL
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="email"
            id="fullName"
            name="fullName"
          ></input>
        </div>

        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cellphone">
            NÚMERO DE CELULAR
          </label>
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
          <div className="flex items-center">
            <label className="pb-2" htmlFor="helthSector">
              ÁREA DE TRABALHO
            </label>
            <IonImg
              src={IconInterrogacao}
              className="pb-2 pl-1 cursor-pointer"
              alt="Icone de interrogação"
            />
          </div>

          {/* <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="helthSector"
            name="helthSector"
            placeholder="Selecione sua área de saúde"
            disabled
          >
          </input>
          <IonImg
            src={IconDown}
            className=""
            alt="Icone de seta para baixo" /> */}
          <div className="border border-zinc-400 p-2 rounded flex flex-row-reverse">
            <input
              className="w-full bg-transparent"
              type="text"
              id="helthSector"
              name="helthSector"
              placeholder="Selecione sua área de saúde"
              disabled
            />
            <IonImg
              src={IconDown}
              className="absolute cursor-pointer"
              alt="Icone de seta para baixo"
            />
          </div>
        </div>
        <div className="flex flex-col pt-6">
          <div className="flex items-center">
            <label className="pb-2" htmlFor="cns">
              NÚMERO CNS
            </label>
            <IonImg
              src={IconInterrogacao}
              className="pb-2 pl-1 cursor-pointer"
              alt="Icone de interrogação"
            />
          </div>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cns"
            name="cns"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="password">
            SENHA
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="password"
            id="password"
            name="password"
          ></input>
          <p className="text-xs text-zinc-400 pt-2">
            No mínimo 8 caracteres, com pelo menos 1 letra maiúscula
          </p>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="passwordConfirm">
            CONFIRMAR SENHA
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="passwordConfirm"
            id="password"
            name="passwordConfirm "
          ></input>
          <p className="text-xs text-zinc-400 pt-2">
            No mínimo 8 caracteres, com pelo menos 1 letra maiúscula
          </p>
        </div>
      </form>
    </>
  );
}
