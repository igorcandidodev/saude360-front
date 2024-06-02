import { Form } from "."

import { IonImg } from "@ionic/react";


import IconInterrogacao from "../../Images/Icons/IconInterrogacao.svg";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { cnpjMask } from "../../utils/cnpjMask";
import { cellPhoneMask } from "../../utils/cellPhoneMask";
import { phoneMask } from "../../utils/phoneMask";

export default function FormDataClinic() {

  const { user, setUser } = useContext(UserContext);
  
  const handleChange = (event: any) => {
    if(event.target.name === "cnpj") {
      setUser({
        ...user,
        clinic: [
          {
            ...user.clinic[0],
            [event.target.name]: cnpjMask(event.target.value),
          },
        ],
      });
      return;
    }
    if(event.target.name === "phoneNumber") {
      setUser({
        ...user,
        clinic: [
          {
            ...user.clinic[0],
            [event.target.name]: cellPhoneMask(event.target.value),
          },
        ],
      });
      return;
    }
    if(event.target.name === "telephoneNumber") {
      setUser({
        ...user,
        clinic: [
          {
            ...user.clinic[0],
            [event.target.name]: phoneMask(event.target.value),
          },
        ],
      });
      return;
    }
    setUser({
      ...user,
      clinic: [
        {
          ...user.clinic[0],
          [event.target.name]: event.target.value,
        },
      ],
    });

  }
  return (
    <>
      <Form.Header text="Dados do Consultório" />
      <form className="w-80 md:w-10/12 2xl:w-7/12 md:grid md:grid-cols-2 md:gap-3">
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cnpj">
            CNPJ
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="cnpj"
            placeholder="XX.XXX.XXX/XXXX-XX"
            name="cnpj"
            onChange={handleChange}
            value={user.clinic[0].cnpj}
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <div className="flex items-center">
            <label className="pb-2" htmlFor="cnes">
              NÚMERO CNES
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
            id="cnesNumber"
            name="cnesNumber"
            onChange={handleChange}
            value={user.clinic[0].cnesNumber}
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cellphone">
            CELULAR
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="(00)90000-0000"
            onChange={handleChange}
            value={user.clinic[0].phoneNumber}
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="phone">
            TELEFONE (OPCIONAL)
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="telephoneNumber"
            name="telephoneNumber"
            placeholder="(00)0000-0000"
            onChange={handleChange}
            value={user.clinic[0].telephoneNumber}
          ></input>
        </div>
      </form>
    </>
  );
}
