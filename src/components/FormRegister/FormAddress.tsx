import { Form } from ".";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";

interface FormPersonalInformationProps {
  isProfessional?: boolean;
}

export function FormAddress({ isProfessional }: FormPersonalInformationProps) {
  const [cepError, setCepError] = useState<string | null>(null);

  // Função para formatar o CEP no formato xxxxx-xxx
  const formatCep = (cep: string) => {
    return cep.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const fetchAddressByCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("CEP não encontrado");
      const data = await response.json();
      if (data.erro) throw new Error("CEP não encontrado");
      setCepError(null);
      return data;
    } catch (error) {
      console.error(error);
      setCepError("CEP não encontrado");
      return null;
    }
  };

  const { user, setUser } = useContext(UserContext);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "cep") {
      const rawCep = value.replace(/\D/g, ""); // Remove tudo que não é número
      const formattedCep = formatCep(rawCep); // Formata o valor com hífen

      // Atualiza o estado com o valor formatado (para o campo de entrada) e o valor "bruto" (para outras lógicas)
      if (rawCep.length === 8) {
        // Quando o CEP tiver 8 números, faz a busca
        const addressData = await fetchAddressByCep(rawCep);
        if (addressData) {
          const updatedAddress = {
            cep: formattedCep,
            street: user.address.street || addressData.logradouro,
            neighborhood: user.address.neighborhood || addressData.bairro,
            city: user.address.city || addressData.localidade,
            state: user.address.state || addressData.uf,
          };

          if (isProfessional) {
            setUser((prevUser) => ({
              ...prevUser,
              clinic: [
                {
                  ...prevUser.clinic[0],
                  address: {
                    ...prevUser.clinic[0].address,
                    ...updatedAddress,
                  },
                },
              ],
            }));
          } else {
            setUser((prevUser) => ({
              ...prevUser,
              address: {
                ...prevUser.address,
                ...updatedAddress,
              },
            }));
          }
        }
      }

      // Atualiza o estado do cep formatado
      if (isProfessional) {
        setUser((prevUser) => ({
          ...prevUser,
          clinic: [
            {
              ...prevUser.clinic[0],
              address: {
                ...prevUser.clinic[0].address,
                cep: formattedCep,
              },
            },
          ],
        }));
      } else {
        setUser((prevUser) => ({
          ...prevUser,
          address: {
            ...prevUser.address,
            cep: formattedCep,
          },
        }));
      }
    } else {
      if (isProfessional) {
        setUser((prevUser) => ({
          ...prevUser,
          clinic: [
            {
              ...prevUser.clinic[0],
              address: {
                ...prevUser.clinic[0].address,
                [name]: value,
              },
            },
          ],
        }));
      } else {
        setUser((prevUser) => ({
          ...prevUser,
          address: {
            ...prevUser.address,
            [name]: value,
          },
        }));
      }
    }
  };

  return (
    <>
      <Form.Header
        text={
          isProfessional ? "Endereço do Consultório" : "Endereço do Paciente"
        }
      />
      <form className="w-80 md:w-10/12 2xl:w-7/12 md:grid md:grid-cols-2 md:gap-3">
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cep">
            CEP <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            onChange={handleChange}
            value={
              isProfessional ? user.clinic[0].address.cep : user.address.cep
            }
            type="text"
            id="cep"
            placeholder="Digite o CEP"
            name="cep"
          />
          {cepError && (
            <span className="text-red-500 text-sm mt-1">{cepError}</span>
          )}
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
            value={
              isProfessional
                ? user.clinic[0].address.street
                : user.address.street
            }
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
            value={
              isProfessional
                ? user.clinic[0].address.number
                : user.address.number
            }
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
            value={
              isProfessional
                ? user.clinic[0].address.complement
                : user.address.complement
            }
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
            value={
              isProfessional
                ? user.clinic[0].address.neighborhood
                : user.address.neighborhood
            }
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
            value={
              isProfessional ? user.clinic[0].address.city : user.address.city
            }
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
            value={
              isProfessional ? user.clinic[0].address.state : user.address.state
            }
          ></input>
        </div>
      </form>
    </>
  );
}
