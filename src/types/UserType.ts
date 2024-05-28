import { Address } from "./AddressType";
import { Professional } from "./ProfessionalType";

export type User = {
    professional: Professional;
    address: Address;
};