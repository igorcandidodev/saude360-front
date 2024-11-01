import { Form } from ".";
import { IonImg } from "@ionic/react";

import IconInterrogacao from "../../Images/Icons/IconInterrogacao.svg";
import IconDown from "../../Images/Icons/IconDown.svg";

import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { IonItem, IonLabel } from '@ionic/react';
import { cpfMask } from "../../utils/cpfMask";
import { cellPhoneMask} from "../../utils/cellPhoneMask";

import { cpf } from 'cpf-cnpj-validator'; 

interface FormPersonalInformationProps {
  isProfessional?: boolean;
  onDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCpfValidation?: (error: string | null) => void; // Nova prop
}
export default function FormPersonalInformation({
  isProfessional,
  onDateChange,
  onCpfValidation, 
}: FormPersonalInformationProps) {
  const { user, setUser } = useContext(UserContext);

  const [ healthSectors, setHealthSectors ] = useState<string[]>(["Medicina", "Nutrição", "Terapia Ocupacional", "Fisioterapia"]);
  const [healthSectorsIsOpen, setHealthSectorsIsOpen] = useState<boolean>(false);
  const [cpfError, setCpfError] = useState<string | null>(null);

  const handleChange = (event: any) => {
    if (event.target.name === "cpf") {
      const formattedCpf = cpfMask(event.target.value);
      setUser({
        ...user,
        [event.target.name]: formattedCpf,
      });

      // Remove todos os caracteres não numéricos
      const unmaskedCpf = formattedCpf.replace(/\D/g, '');
      
      // Valida CPF apenas se tiver 11 dígitos
      if (unmaskedCpf.length === 11) {
        if (cpf.isValid(unmaskedCpf)) {
          setCpfError(null);
          onCpfValidation?.(null);
        } else {
          setCpfError("CPF inválido");
          onCpfValidation?.("CPF inválido");
        }
      } else if (unmaskedCpf.length >= 0) {
        setCpfError("CPF inválido");
        onCpfValidation?.("CPF inválido");
      }
      return;
    }

    if (event.target.name === "phoneNumber") {
      setUser({
        ...user,
        [event.target.name]: cellPhoneMask(event.target.value),
      });
      return;
    }

    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleHealthSector = (healthSector: string) => {
    setUser({
      ...user,
      healthSectorsNames: [healthSector],
    });
    setHealthSectorsIsOpen(!healthSectorsIsOpen)
  }

  return (
    <>
      <Form.Header text="Informacões Pessoais" />
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
            onChange={handleChange}
            value={user.cpf}
          ></input>
          {cpfError && <p className="text-red-500 text-xs">{cpfError}</p>}
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="dateBirthday">
            DATA DE NASCIMENTO <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="date"
            id="birthDate"
            name="birthDate"
            onChange={handleChange}
            value={user.birthDate}
          ></input>
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
          ></input>
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
          ></input>
          <p className="text-xs text-zinc-400 pt-2">Não coloque símbolos</p>
        </div>

        {isProfessional && (
          <>
            <div className="flex flex-col pt-6">
              <div className="flex items-center">
                <label className="pb-2" htmlFor="helthSector">
                  ÁREA DE TRABALHO <span className="text-red-500">*</span>
                </label>
                <IonImg
                  src={IconInterrogacao}
                  className="pb-2 pl-1 cursor-pointer"
                  alt="Icone de interrogação"
                />
              </div>
              <div className="border border-zinc-400 p-2 rounded flex flex-row-reverse">
                <input
                  className="w-full bg-transparent"
                  type="text"
                  id="healthSectorsNames"
                  name="healthSectorsNames"
                  placeholder="Selecione sua área de saúde"
                  value={user.healthSectorsNames}
                  disabled
                />
                <IonImg
                  src={IconDown}
                  className="absolute cursor-pointer"
                  alt="Icone de seta para baixo"
                  onClick={() => setHealthSectorsIsOpen(!healthSectorsIsOpen)}
                />
              </div>
              {healthSectorsIsOpen && (
                  healthSectors.map((healthSector, index) => {
                    return (
                      <div key={index}>
                        <IonItem button={true}>
                          <IonLabel onClick={() => handleHealthSector(healthSector)}>{healthSector}</IonLabel>
                        </IonItem>
                      </div>
                    )
                  })
                  )} 
            </div>
            <div className="flex flex-col pt-6">
              <div className="flex items-center">
                <label className="pb-2" htmlFor="cns">
                  NÚMERO CNS <span className="text-red-500">*</span>
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
                id="cnsNumber"
                placeholder="Digite o número CNS"
                name="cnsNumber"
                onChange={handleChange}
                value={user.cnsNumber}
              ></input>
            </div>
            <div className="flex flex-col pt-6">
              <label className="pb-2" htmlFor="password">
                SENHA <span className="text-red-500">*</span>
              </label>
              <input
                className="border border-zinc-400 p-2 rounded"
                type="password"
                id="password"
                placeholder="Digite sua senha"
                name="password"
                onChange={handleChange}
                value={user.password}
              ></input>
              <p className="text-xs text-zinc-400 pt-2">
                No mínimo 8 caracteres, com pelo menos 1 letra maiúscula
              </p>
            </div>
            {/* <div className="flex flex-col pt-6">
              <label className="pb-2" htmlFor="passwordConfirm">
                CONFIRMAR SENHA
              </label>
              <input
                className="border border-zinc-400 p-2 rounded"
                type="passwordConfirm"
                id="password"
                name="passwordConfirm"
              ></input>
              <p className="text-xs text-zinc-400 pt-2">
                No mínimo 8 caracteres, com pelo menos 1 letra maiúscula
              </p>
            </div> */}
          </>
        )}

      </form>
    </>
  );
}
