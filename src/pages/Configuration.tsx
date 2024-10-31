import React, { useEffect, useContext, useState } from 'react';
import { IonContent, IonPage, IonInput, IonSelect, IonSelectOption, IonButton, IonTextarea, IonIcon, IonAvatar } from '@ionic/react';
import Menu from '../components/Menu';
import UserService from '../core/services/UserService';
import { UserContext } from '../context/userContext';

function Configuration() {
    const { user, setUser } = useContext(UserContext);
    const [isProfessional, setIsProfessional] = useState(false);

    useEffect(() => {
        const roles = JSON.parse(localStorage.getItem("roles") || "[]");
        const professionalRole = roles.some(role => role.authority === "ROLE_PROFESSIONAL");
        setIsProfessional(professionalRole);
        
        const fetchUserData = async () => {
            const userService = new UserService();
            const userCpf = localStorage.getItem("cpf");
            if (userCpf) {
                const userData = await userService.getUserByCpf(userCpf);
                setUser(userData);
            }
        };

        fetchUserData();
    }, [setUser]);

    const clinic = user.clinics?.[0]; // Primeiro elemento das clínicas
    const address = clinic?.address; // Endereço da clínica

    return (
        <IonPage>
            <Menu />
            <IonContent>
                <div className="mt-20 bg-gray3">
                    <div className='h-full flex items-center lg:justify-center'>
                        <div className='flex flex-col lg:justify-center'>
                            <div className='flex justify-center'>
                                <div className='flex-col w-full mx-5 lg:w-3/4 mt-10 lg:mt-0'>
                                    <div className='flex w-2/5 lg:w-full items-center justify-between'>
                                        <h1 className='text-3xl'>Configurações</h1>
                                        <IonButton>
                                            <IonIcon slot="start"></IonIcon>
                                            Editar
                                        </IonButton>
                                    </div>
                                    <div className='bg-white p-10 rounded-md mt-5'>
                                        {/* Área da imagem */}
                                        <div className='flex my-4 items-center gap-2'>
                                            <IonAvatar className='border-4 border-slate-300'>
                                                <img alt="Silhouette of a person's head" src={`https://ionicframework.com/docs/img/demos/avatar.svg`} />
                                            </IonAvatar>
                                            <h2 className="text-2xl">{user.fullName}</h2>
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
                                                        value={user.fullName}
                                                        readonly
                                                    ></IonTextarea>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonTextarea
                                                        label="CPF"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={user.cpf}
                                                        readonly
                                                    ></IonTextarea>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="E-mail"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={user.email}
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Data de Nascimento"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={user.birthDate}
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Número do Celular"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={user.phoneNumber}
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Número CNS"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={user.cnsNumber}
                                                        readonly
                                                    ></IonInput>
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
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Número"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={address?.number}
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Bairro"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={address?.neighborhood}
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Cidade"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={address?.city}
                                                        
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonSelect
                                                        label="Estado"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={address?.state}
                                                    >
                                                        <IonSelectOption value="RJ">Rio de Janeiro</IonSelectOption>
                                                        <IonSelectOption value="SP">São Paulo</IonSelectOption>
                                                    </IonSelect>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="CEP"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={address?.cep}
                                                        readonly
                                                    ></IonInput>
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
                                                        value={clinic?.cnpj}
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Número CNS"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={clinic?.cnesNumber}
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Telefone"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={clinic?.telephoneNumber}
                                                        readonly
                                                    ></IonInput>
                                                </div>
                                                <div className="w-full md:w-1/2 px-2 mt-2">
                                                    <IonInput
                                                        label="Celular"
                                                        labelPlacement="floating"
                                                        fill="outline"
                                                        value={clinic?.phoneNumber}
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
        </IonPage>
    );
}

export default Configuration;
