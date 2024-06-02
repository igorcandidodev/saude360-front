import React, { createContext, useState, Dispatch, SetStateAction} from 'react';

const UserAuthContext = createContext<any>('');

const UserAuthContextProvider = ({ children }) => {
    const [authInitial, setAuthInitial] = useState({cpf: "", password: ""});

    return (
        <UserAuthContext.Provider value={{ authInitial, setAuthInitial }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export { UserAuthContextProvider, UserAuthContext };