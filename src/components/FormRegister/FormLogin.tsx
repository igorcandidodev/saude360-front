import React, { useContext } from "react";
import { Form } from ".";
import { UserAuthContext } from "../../context/userAuth";
import { cpfMask } from "../../utils/cpfMask";

export default function FormLogin() {

  const { authInitial, setAuthInitial } = useContext(UserAuthContext);

  const handleChange = (event: any) => {
    if(event.target.name === "cpf") {
      setAuthInitial({
        ...authInitial,
        [event.target.name]: cpfMask(event.target.value)
      });
      return;
    }
    setAuthInitial({
      ...authInitial,
      [event.target.name]: event.target.value,
    });
  }

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
            onChange={handleChange}
            value={authInitial.cpf}
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
            onChange={handleChange}
            value={authInitial.password}
          />
        </div>
      </form>
    </>
  );
}
