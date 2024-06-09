import React, { createContext, useState, Dispatch, SetStateAction} from 'react';
import { User } from '../types/UserType';
import { Professional } from '../types/ProfessionalType';
import { Address } from '../types/AddressType';

interface UserContextType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }) => {


const [initialUser, setInitialUser] = useState({
    fullName: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
    cpf: "",
    password: "",
    healthSectorsNames: [""],
    cnsNumber: "",
    clinic: [
      {
        cnpj: "",
        phoneNumber: "",
        telephoneNumber: "",
        cnesNumber: "",
        address: {
          cep: "",
          state: "",
          city: "",
          neighborhood: "",
          street: "",
          number: "",
          complement: "",
        },
      },
    ],
    address: {
      cep: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
    },
  } as User);

const [user, setUser] = useState<User>(initialUser);

    return (
        <UserContext.Provider value={{user, setUser}}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContextProvider, UserContext };