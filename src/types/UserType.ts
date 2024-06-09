import { Address } from "./AddressType";
import { Clinic } from "./ClinicType";

export type User = {
    fullName: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
    cpf: string;
    password: string;
    healthSectorsNames: string[];
    cnsNumber: string;
    clinic: Clinic[];
    address: Address;
};