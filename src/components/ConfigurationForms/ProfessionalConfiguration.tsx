import React, { useEffect, useContext, useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonTextarea,
  IonIcon,
  IonAvatar,
  IonText,
} from "@ionic/react";
import UserService from "../../core/services/UserService";
import ProfessionalService from "../../core/services/ProfessionalService";
import { UserContext } from "../../context/userContext";

function ProfessionalConfiguration() {
  const { user, setUser } = useContext(UserContext);
  const [isProfessional, setIsProfessional] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    const professionalRole = roles.some(
      (role) => role.authority === "ROLE_PROFESSIONAL"
    );
    setIsProfessional(professionalRole);

    const fetchUserData = async () => {
      const userService = new UserService();
      const userCpf = localStorage.getItem("cpf");
      if (userCpf) {
        const userData = await userService.getUserByCpf(userCpf);
        setUser(userData);
        setUserData(userData);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => {
      if (name.startsWith("address.")) {
        const addressField = name.split(".")[1];
        return {
          ...prevState,
          clinics: prevState.clinics.map((clinic, index) =>
            index === 0
              ? {
                  ...clinic,
                  address: {
                    ...clinic.address,
                    [addressField]: value,
                  },
                }
              : clinic
          ),
        };
      } else if (name.startsWith("clinic.")) {
        const clinicField = name.split(".")[1];
        return {
          ...prevState,
          clinics: prevState.clinics.map((clinic, index) =>
            index === 0
              ? {
                  ...clinic,
                  [clinicField]: value,
                }
              : clinic
          ),
        };
      } else {
        return { ...prevState, [name]: value };
      }
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.detail.value;
    setPassword(newPassword);

    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPass = e.detail.value;
    setConfirmPassword(confirmPass);

    if (password !== confirmPass) {
      setPasswordError("As senhas não coincidem");
    } else {
      setPasswordError("");
    }
  };

  const handleUpdate = async () => {
    const professionalService = new ProfessionalService();
    const userService = new UserService();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token de autenticação não encontrado.");
      return;
    }

    // Se as senhas foram preenchidas mas não coincidem, impede o envio
    if ((password || confirmPassword) && password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    const completeData = {
      fullName: userData.fullName,
      cpf: userData.cpf,
      birthDate: userData.birthDate,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      healthSectorsNames: userData.healthSectorsNames || [],
      cnsNumber: userData.cnsNumber,
      clinic: [
        {
          cnpj: userData.clinics[0].cnpj,
          phoneNumber: userData.clinics[0].phoneNumber,
          telephoneNumber: userData.clinics[0].telephoneNumber,
          cnesNumber: userData.clinics[0].cnesNumber,
          address: { ...userData.clinics[0].address },
        },
      ],
    };

    // Só inclui a senha no payload se ambos os campos foram preenchidos e são iguais
    if (password && password === confirmPassword) {
      completeData.password = password;
    }

    console.log("Dados enviados para a API:", completeData);

    try {
      if (isProfessional) {
        await professionalService.updateProfessional(completeData, token);
      } else {
        await userService.updatePatient(userData.id, completeData, token);
      }
      setUser(userData);
      setIsEditable(false);
      // Limpa os campos de senha após atualização bem-sucedida
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  };

  const clinic = userData.clinics?.[0];
  const address = clinic?.address;

  return (
    <IonContent>
      <div className="mt-20 bg-gray3">
        <div className="h-full flex items-center lg:justify-center">
          <div className="flex flex-col lg:justify-center">
            <div className="flex justify-center">
              <div className="flex-col w-full mx-5 lg:w-3/4 mt-10 lg:mt-0">
                <div className="flex md:w-2/5 flex-col md:flex-row w-fit lg:w-full md:items-center justify-between">
                  <h1 className="text-3xl">Configurações</h1>
                  <div className="flex justify-between">
                    {isEditable ? (
                      <IonButton onClick={handleUpdate}>Salvar</IonButton>
                    ) : (
                      <IonButton onClick={() => setIsEditable(true)}>
                        Editar
                      </IonButton>
                    )}
                  </div>
                </div>
                <div className="bg-white p-10 rounded-md mt-5">
                  <div className="flex my-4 items-center gap-2">
                    <IonAvatar className="border-4 border-slate-300">
                      <img
                        alt="Silhouette of a person's head"
                        src="https://ionicframework.com/docs/img/demos/avatar.svg"
                      />
                    </IonAvatar>
                    <h2 className="text-2xl">{userData.fullName}</h2>
                  </div>

                  {/* Informações Pessoais */}
                  <div className="space-y-4">
                    <h2 className="text-2xl">Informações Pessoais</h2>
                    <hr />
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full md:w-1/2 px-2 mt-2">
                        <IonTextarea
                          label="Nome Completo"
                          labelPlacement="floating"
                          fill="outline"
                          value={userData.fullName}
                          name="fullName"
                          onIonChange={handleInputChange}
                          readonly={!isEditable}
                        ></IonTextarea>
                      </div>
                      <div className="w-full md:w-1/2 px-2 mt-2">
                        <IonTextarea
                          label="CPF"
                          labelPlacement="floating"
                          fill="outline"
                          value={userData.cpf}
                          name="cpf"
                          onIonChange={handleInputChange}
                          readonly={!isEditable}
                        ></IonTextarea>
                      </div>
                      <div className="w-full md:w-1/2 px-2 mt-2">
                        <IonInput
                          label="E-mail"
                          labelPlacement="floating"
                          fill="outline"
                          value={userData.email}
                          name="email"
                          onIonChange={handleInputChange}
                          readonly={!isEditable}
                        ></IonInput>
                      </div>
                      <div className="w-full md:w-1/2 px-2 mt-2">
                        <IonInput
                          label="Data de Nascimento"
                          labelPlacement="floating"
                          fill="outline"
                          value={userData.birthDate}
                          name="birthDate"
                          onIonChange={handleInputChange}
                          readonly={!isEditable}
                        ></IonInput>
                      </div>
                      <div className="w-full md:w-1/2 px-2 mt-2">
                        <IonInput
                          label="Número do Celular"
                          labelPlacement="floating"
                          fill="outline"
                          value={userData.phoneNumber}
                          name="phoneNumber"
                          onIonChange={handleInputChange}
                          readonly={!isEditable}
                        ></IonInput>
                      </div>
                      <div className="w-full md:w-1/2 px-2 mt-2">
                        <IonInput
                          label="Número CNS"
                          labelPlacement="floating"
                          fill="outline"
                          value={userData.cnsNumber}
                          name="cnsNumber"
                          onIonChange={handleInputChange}
                          readonly={!isEditable}
                        ></IonInput>
                      </div>
                    </div>
                  </div>

                  {/* Edição de senha */}
                  <div className="space-y-4">
                    <h2 className="text-2xl">Senha</h2>
                    <hr />
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full md:w-1/2 px-2 mt-2">
                        <IonInput
                          type="password"
                          label="Nova senha"
                          labelPlacement="floating"
                          fill="outline"
                          value={password}
                          onIonChange={handlePasswordChange}
                          readonly={!isEditable}
                        ></IonInput>
                      </div>
                      <div className="w-full md:w-1/2 px-2 mt-2">
                        <IonInput
                          type="password"
                          label="Confirme a Nova Senha"
                          labelPlacement="floating"
                          fill="outline"
                          value={confirmPassword}
                          onIonChange={handleConfirmPasswordChange}
                          readonly={!isEditable}
                        ></IonInput>
                        {passwordError && (
                          <IonText color="danger" className="text-sm mt-1">
                            {passwordError}
                          </IonText>
                        )}
                      </div>
                    </div>
                  </div>

                  {isProfessional && (
                    <>
                      {/* Endereço Consultório */}
                      <div className="mt-8 space-y-4">
                        <h2 className="text-2xl">Endereço Consultório</h2>
                        <hr />
                        <div className="flex flex-wrap -mx-2">
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonInput
                              label="Rua"
                              labelPlacement="floating"
                              fill="outline"
                              value={address?.street}
                              name="address.street"
                              onIonChange={handleInputChange}
                              readonly={!isEditable}
                            ></IonInput>
                          </div>
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonInput
                              label="Número"
                              labelPlacement="floating"
                              fill="outline"
                              value={address?.number}
                              name="address.number"
                              onIonChange={handleInputChange}
                              readonly={!isEditable}
                            ></IonInput>
                          </div>
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonInput
                              label="Bairro"
                              labelPlacement="floating"
                              fill="outline"
                              value={address?.neighborhood}
                              name="address.neighborhood"
                              onIonChange={handleInputChange}
                              readonly={!isEditable}
                            ></IonInput>
                          </div>
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonInput
                              label="Cidade"
                              labelPlacement="floating"
                              fill="outline"
                              value={address?.city}
                              name="address.city"
                              onIonChange={handleInputChange}
                              readonly={!isEditable}
                            ></IonInput>
                          </div>
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonSelect
                              label="Estado"
                              labelPlacement="floating"
                              fill="outline"
                              value={address?.state}
                              name="address.state"
                              onIonChange={handleInputChange}
                              disabled={!isEditable}
                            >
                              <IonSelectOption value="RJ">
                                Rio de Janeiro
                              </IonSelectOption>
                              <IonSelectOption value="SP">
                                São Paulo
                              </IonSelectOption>
                            </IonSelect>
                          </div>
                        </div>
                      </div>
                      {/* Dados do Consultório */}
                      <div className="mt-8 space-y-4">
                        <h2 className="text-2xl">Dados do Consultório</h2>
                        <hr />
                        <div className="flex flex-wrap -mx-2">
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonInput
                              label="CNPJ"
                              labelPlacement="floating"
                              fill="outline"
                              onIonChange={handleInputChange}
                              value={clinic?.cnpj}
                              name="clinic.cnpj"
                              readonly={!isEditable}
                            ></IonInput>
                          </div>
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonInput
                              label="Número CNS"
                              labelPlacement="floating"
                              fill="outline"
                              onIonChange={handleInputChange}
                              value={clinic?.cnesNumber}
                              name="clinic.cnesNumber"
                              readonly={!isEditable}
                            ></IonInput>
                          </div>
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonInput
                              label="Telefone"
                              labelPlacement="floating"
                              fill="outline"
                              onIonChange={handleInputChange}
                              value={clinic?.telephoneNumber}
                              name="clinic.telephoneNumber"
                              readonly={!isEditable}
                            ></IonInput>
                          </div>
                          <div className="w-full md:w-1/2 px-2 mt-2">
                            <IonInput
                              label="Celular"
                              labelPlacement="floating"
                              fill="outline"
                              onIonChange={handleInputChange}
                              value={clinic?.phoneNumber}
                              name="clinic.phoneNumber"
                              readonly
                            ></IonInput>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
}

export default ProfessionalConfiguration;
