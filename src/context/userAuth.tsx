import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

const UserAuthContext = createContext<any>('');

const UserAuthContextProvider = ({ children }) => {
    const [authInitial, setAuthInitial] = useState({ cpf: "", password: "" });
    const [userCpf, setUserCpf] = useState<string | null>(null); // Adicione estado para o ID do usuário

    return (
        <UserAuthContext.Provider value={{ authInitial, setAuthInitial, userCpf, setUserCpf }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export { UserAuthContextProvider, UserAuthContext };