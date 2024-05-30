import { list } from "postcss";
import { Address } from "./AddressType";
import { Professional } from "./ProfessionalType";

export type User = {
    fullName: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
    cpf: string;
    password: string;
    healthSectorsNames: string[];
    cnsNumber: string;
    address: Address;
};