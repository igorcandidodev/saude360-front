import React, {createContext, useState, useEffect, useContext, Dispatch, SetStateAction, ReactNode,} from "react";
  import PatientService from "../core/services/PatientService";
  
  interface Address {
    id: number;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    complement: string;
  }
  
  interface Patient {
    id: number;
    fullName: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
    cpf: string;
    idProfilePicture: string;
    comments: string[];
    orientations: any[];
    address: Address;
  }
  
  interface PatientsContextType {
    patients: Patient[];
    fetchAllPatients: () => Promise<void>;
  }
  
  const PatientsContext = createContext<PatientsContextType | undefined>(
    undefined
  );
  
  const PatientsProvider = ({ children }: { children: ReactNode }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const patientService = new PatientService();
  
    const fetchAllPatients = async () => {
      try {
        const patientsData = await patientService.getAllPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
  
    useEffect(() => {
      fetchAllPatients();
    }, []);
  
    return (
      <PatientsContext.Provider value={{ patients, fetchAllPatients }}>
        {children}
      </PatientsContext.Provider>
    );
  };
  
  const usePatients = () => {
    const context = useContext(PatientsContext);
    if (context === undefined) {
      throw new Error("usePatients must be used within a PatientsProvider");
    }
    return context;
  };
  
  export { PatientsProvider, usePatients };
  