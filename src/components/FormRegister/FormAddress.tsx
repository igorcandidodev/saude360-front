import { Form } from ".";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export function FormAddress() {
    const { user, setUser } = useContext(UserContext);

    const handleChange = (event: any) => {
        setUser({
          ...user,
          clinic: [
            {
              ...user.clinic[0],
              address: {
                ...user.clinic[0].address,
                [event.target.name]: event.target.value,
              },
            },
          ]
        });
    }

    return (
<>
     <Form.Header text="Endereço Consultório"/>
      <form className="w-80 md:w-10/12 2xl:w-7/12 md:grid md:grid-cols-2 md:gap-3">
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cep">
            CEP
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            onChange={handleChange}
            value={user.clinic[0].address.cep}
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
            id="street"
            name="street"
            onChange={handleChange}
            value={user.clinic[0].address.street}
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
            onChange={handleChange}
            value={user.clinic[0].address.number}
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
            onChange={handleChange}
            value={user.clinic[0].address.complement}
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
            onChange={handleChange}
            value={user.clinic[0].address.neighborhood}
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
            onChange={handleChange}
            value={user.clinic[0].address.city}
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
            onChange={handleChange}
            value={user.clinic[0].address.state}
          ></input>
        </div>
      </form>
    </>
    )
}