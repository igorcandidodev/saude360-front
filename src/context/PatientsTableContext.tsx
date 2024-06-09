import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import PatientService from "../core/services/PatientService"

interface PatientData {
  paciente: string;
  dataConsulta: Date | null;
  ultimoEnvio: Date | null;
  ultimoFeedback: Date | null;
}

interface PatientsTableContextType {
  patients: PatientData[];
  setPatients: Dispatch<SetStateAction<PatientData[]>>;
  fetchPatients: () => Promise<void>;
}

const PatientsTableContext = createContext<PatientsTableContextType | undefined>(
  undefined
);

const PatientsTableProvider = ({ children }) => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const patientService = new PatientService();

  const fetchPatients = async () => {
    try {
      const patientsData = await patientService.getPatientsTable();
      setPatients(patientsData);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <PatientsTableContext.Provider value={{ patients, setPatients, fetchPatients }}>
      {children}
    </PatientsTableContext.Provider>
  );
};

const usePatientsTable = () => {
  const context = useContext(PatientsTableContext);
  if (context === undefined) {
    throw new Error("usePatientsTable must be used within a PatientsTableProvider");
  }
  return context;
};

export { PatientsTableProvider, usePatientsTable }; 
