import { Address } from "./AddressType";

export type Clinic = {
    cnpj: string;
    phoneNumber: string;
    telephoneNumber: string;
    cnesNumber: string;
    address: Address;
};