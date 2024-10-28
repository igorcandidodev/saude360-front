import { Form } from ".";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

interface FormPersonalInformationProps {
  isProfessional?: boolean;
}

export function FormAddress({isProfessional}:FormPersonalInformationProps) {
  
    const { user, setUser } = useContext(UserContext);

    const handleChange = (event: any) => {
      if (isProfessional){
        setUser({
          ...user,
          address: {
            ...user.address,
            [event.target.name]: event.target.value
          }
        });
        return
      }
      setUser({
        ...user,
            address: {
              ...user.address,
              [event.target.name]: event.target.value,
            },
          },
      );
      
    }

    return (
<>
      <Form.Header text={isProfessional ? "Endereço do Consultório" : "Endereço do Paciente"} />
      <form className="w-80 md:w-10/12 2xl:w-7/12 md:grid md:grid-cols-2 md:gap-3">
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cep">
            CEP <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            onChange={handleChange}
            value={(isProfessional) ? user.clinic[0].address.cep : user.address.cep}
            type="text"
            id="cep"
            placeholder="Digite o CEP"
            name="cep"
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="road">
            RUA <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="street"
            placeholder="Digite a rua"
            name="street"
            onChange={handleChange}
            value={(isProfessional) ? user.clinic[0].address.street : user.address.street}
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="dateBirthday">
            NÚMERO <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="number"
            placeholder="Digite o número"
            name="number"
            onChange={handleChange}
            value={(isProfessional) ? user.clinic[0].address.number : user.address.number}
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
            placeholder="Digite o complemento"
            name="complement"
            onChange={handleChange}
            value={(isProfessional) ? user.clinic[0].address.complement : user.address.complement}
          ></input>
        </div>

        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="neighborhood">
            BAIRRO <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="neighborhood"
            placeholder="Digite o bairro"
            name="neighborhood"
            onChange={handleChange}
            value={(isProfessional) ? user.clinic[0].address.neighborhood : user.address.neighborhood}
          ></input>
        </div>

        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="city">
            CIDADE <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="city"
            placeholder="Digite a cidade"
            name="city"
            onChange={handleChange}
            value={(isProfessional) ? user.clinic[0].address.city : user.address.city}
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="state">
            ESTADO <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="state"
            placeholder="Digite o estado"
            name="state"
            onChange={handleChange}
            value={(isProfessional) ? user.clinic[0].address.state : user.address.state}
          ></input>
        </div>
      </form>
    </>
    )
}