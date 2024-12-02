import { Form } from ".";
import { IonImg } from "@ionic/react";
import IconInterrogacao from "../../Images/Icons/IconInterrogacao.svg";
import IconDown from "../../Images/Icons/IconDown.svg";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { IonItem, IonLabel } from "@ionic/react";
import { cpfMask } from "../../utils/cpfMask";
import { cellPhoneMask } from "../../utils/cellPhoneMask";
import ProfessionalService from "../../core/services/ProfessionalService";
import { cpf } from "cpf-cnpj-validator";

interface FormPersonalInformationProps {
  isProfessional?: boolean;
  onFormValidityChange?: (isValid: boolean) => void;
}

interface HealthSector {
  id: number;
  name: string;
}

export default function FormPersonalInformation({
  isProfessional,
  onFormValidityChange,
}: FormPersonalInformationProps) {
  const { user, setUser } = useContext(UserContext);
  const [healthSectors, setHealthSectors] = useState<HealthSector[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const professionalService = new ProfessionalService();
  const [healthSectorsIsOpen, setHealthSectorsIsOpen] =
    useState<boolean>(false);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null); // Estado para o erro do telefone

  const requiredFields = [
    "fullName",
    "cpf",
    "birthDate",
    "email",
    "phoneNumber",
    ...(isProfessional ? ["healthSectorsNames", "cnsNumber", "password"] : []),
  ];

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "cpf") {
      const formattedCpf = cpfMask(value);
      setUser({ ...user, [name]: formattedCpf });
      const unmaskedCpf = formattedCpf.replace(/\D/g, "");
      if (unmaskedCpf.length === 11 && !cpf.isValid(unmaskedCpf)) {
        setCpfError("CPF inválido");
      } else {
        setCpfError(null);
      }
    } else if (name === "phoneNumber") {
      const formattedPhone = cellPhoneMask(value);
      setUser({ ...user, [name]: formattedPhone });

      // Validação do número de telefone
      const phoneRegex = /^\(\d{2}\)9\d{4}-\d{4}$/;
      if (!phoneRegex.test(formattedPhone)) {
        setPhoneError(
          "Número de telefone inválido. Use o formato (xx)9xxxx-xxxx."
        );
      } else {
        setPhoneError(null);
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleHealthSector = (healthSector: HealthSector) => {
    setUser({ ...user, healthSectorsNames: [healthSector.name] });
    setHealthSectorsIsOpen(!healthSectorsIsOpen);
  };

  const fetchHealthSectors = async () => {
    try {
      setIsLoading(true);
      const response = await professionalService.getHealthSectors();
      setHealthSectors(response);
    } catch (error) {
      console.error("Erro ao buscar áreas de saúde:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkFormValidity = () => {
    const allFieldsValid = requiredFields.every((field) => user[field]);
    onFormValidityChange?.(allFieldsValid && !cpfError && !phoneError);
  };

  useEffect(() => {
    fetchHealthSectors();
  }, []);

  useEffect(() => {
    checkFormValidity();
  }, [user, cpfError, phoneError]); // Agora também depende do phoneError

  return (
    <>
      <Form.Header text="Informações Pessoais" />
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
            onChange={handleChange}
            value={user.fullName}
          />
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
            onChange={handleChange}
            value={user.cpf}
          />
          {cpfError && <p className="text-red-500 text-xs">{cpfError}</p>}
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="birthDate">
            DATA DE NASCIMENTO <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="date"
            id="birthDate"
            name="birthDate"
            onChange={handleChange}
            value={user.birthDate}
          />
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="email">
            E-MAIL <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="email"
            id="email"
            placeholder="Digite o e-mail"
            name="email"
            onChange={handleChange}
            value={user.email}
          />
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="phoneNumber">
            NÚMERO DE CELULAR <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Digite o número de celular"
            onChange={handleChange}
            value={user.phoneNumber}
          />
          {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}{" "}
          {/* Exibe o erro aqui */}
        </div>

        {isProfessional && (
          <>
            <div className="flex flex-col pt-6 relative">
              <div className="flex items-center">
                <label className="pb-2" htmlFor="healthSector">
                  ÁREA DE TRABALHO <span className="text-red-500">*</span>
                </label>
                <IonImg
                  src={IconInterrogacao}
                  className="pb-2 pl-1 cursor-pointer"
                  alt="Icone de interrogação"
                />
              </div>
              <div
                className="border border-zinc-400 p-2 rounded flex items-center justify-between cursor-pointer"
                onClick={() => setHealthSectorsIsOpen(!healthSectorsIsOpen)}
              >
                <input
                  className="w-full bg-transparent"
                  type="text"
                  id="healthSectorsNames"
                  name="healthSectorsNames"
                  placeholder="Selecione sua área de saúde"
                  value={user.healthSectorsNames || ""}
                  readOnly
                />
                <IonImg
                  src={IconDown}
                  className="cursor-pointer"
                  alt="Ícone de seta para baixo"
                />
              </div>
              {healthSectorsIsOpen && (
                <div className="absolute z-10 bg-white border border-zinc-400 rounded shadow-lg mt-1 max-h-40 overflow-y-auto w-full">
                  {isLoading ? (
                    <p className="text-center text-zinc-500 py-2">
                      Carregando...
                    </p>
                  ) : (
                    healthSectors.map((healthSector) => (
                      <div
                        key={healthSector.id}
                        className="px-4 py-2 hover:bg-zinc-100 cursor-pointer"
                        onClick={() => {
                          handleHealthSector(healthSector);
                          setHealthSectorsIsOpen(false);
                        }}
                      >
                        {healthSector.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col pt-6">
              <label className="pb-2" htmlFor="cnsNumber">
                NÚMERO CNS <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-zinc-400 p-2 rounded"
                type="text"
                id="cnsNumber"
                name="cnsNumber"
                placeholder="Digite o número CNS"
                onChange={handleChange}
                value={user.cnsNumber}
              />
            </div>
            <div className="flex flex-col pt-6">
              <label className="pb-2" htmlFor="password">
                SENHA <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-zinc-400 p-2 rounded"
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                onChange={handleChange}
                value={user.password}
              />
              <p className="text-gray-400 italic text-sm">
                8 dígitos, com pelo menos 1 letra maiúscula.
              </p>
            </div>
          </>
        )}
      </form>
    </>
  );
}
