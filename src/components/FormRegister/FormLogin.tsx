import React from "react";
import { Form } from ".";

export default function FormLogin() {
  return (
    <>
      <form className="flex flex-col w-80"> {/* Mudança aqui */}
        <div className="mb-4">
          <label className="pb-2 block" htmlFor="cpf">
            CPF
          </label>
          <input
            className="w-full border border-zinc-400 p-2 rounded"
            type="text"
            id="cpf"
            placeholder="000.000.000-00"
            name="cpf"
          />
        </div>
        <div className="mb-4">
          <label className="pb-2 block" htmlFor="password">
            SENHA
          </label>
          <input
            className="w-full border border-zinc-400 p-2 rounded"
            type="password"
            id="password"
            name="password"
          />
        </div>
      </form>
    </>
  );
}
