import { Form } from ".";
import { IonImg } from "@ionic/react";

import IconInterrogacao from "../../Images/Icons/IconInterrogacao.svg";
import IconDown from "../../Images/Icons/IconDown.svg";

import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';

interface FormPersonalInformationProps {
  isProfessional?: boolean;
  onDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FormPersonalInformation({
  isProfessional,
  onDateChange,
}: FormPersonalInformationProps) {
  const { user, setUser } = useContext(UserContext);

  const [ healthSectors, setHealthSectors ] = useState<string[]>(["Medicina", "Nutrição", "Terapia Ocupacional", "Fisioterapia"]);
  const [healthSectorsIsOpen, setHealthSectorsIsOpen] = useState<boolean>(false);

  const handleChange = (event: any) => {
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
            NOME COMPLETO
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="fullName"
            name="fullName"
            onChange={handleChange}
            value={user.fullName}
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
            onChange={handleChange}
            value={user.cpf}
          ></input>
        </div>
        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="dateBirthday">
            DATA DE NASCIMENTO
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
            E-MAIL
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={user.email}
          ></input>
        </div>

        <div className="flex flex-col pt-6">
          <label className="pb-2" htmlFor="cellphone">
            NÚMERO DE CELULAR
          </label>
          <input
            className="border border-zinc-400 p-2 rounded"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="(00) 90000-0000"
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
                  ÁREA DE TRABALHO
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
                id="cnsNumber"
                name="cnsNumber"
                onChange={handleChange}
                value={user.cnsNumber}
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
                onChange={handleChange}
                value={user.password}
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
          </>
        )}

        {!isProfessional && (
          <>
            <div className="flex flex-col pt-6">
              <div className="flex items-center">
                <label className="pb-2" htmlFor="helthSector">
                  FREQUÊNCIA DE ATENDIMENTO
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
                  id="serviceFrequency"
                  name="serviceFrequency"
                  placeholder="Selecione a frequência"
                  disabled
                />
                <IonImg
                  src={IconDown}
                  className="absolute cursor-pointer"
                  alt="Icone de seta para baixo"
                />
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
}
