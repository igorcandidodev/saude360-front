import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import PatientService from "../core/services/PatientService";

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
  filterPatients: (order: 'asc' | 'desc') => void; // Atualizando a função para não precisar da chave
  loading: boolean;
  errorMessage: string;
}

const PatientsTableContext = createContext<PatientsTableContextType | undefined>(
  undefined
);

const PatientsTableProvider = ({ children }) => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const patientService = new PatientService();

  const fetchPatients = async () => {
    setLoading(true);
    setErrorMessage("");
  
    try {
      const patientsData = await patientService.getPatientsTable();
  
      if (!patientsData || patientsData.length === 0) {
        setErrorMessage("Não há pacientes cadastrados para este profissional.");
        setPatients([]);
      } else {
        setPatients(patientsData);
        setErrorMessage("");
      }

    } catch (error: any) {
      console.error("Error fetching patients:", error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("Não há pacientes cadastrados para este profissional.");
      } else {
        setErrorMessage("Erro ao carregar lista de pacientes. Tente novamente mais tarde.");
      }
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar os pacientes
  const filterPatients = (order: 'asc' | 'desc', key: keyof PatientData = 'paciente') => {
    const sortedPatients = [...patients].sort((a, b) => {
      if (key === 'dataConsulta') {
        const dateA = a.dataConsulta ? new Date(a.dataConsulta) : new Date(0);
        const dateB = b.dataConsulta ? new Date(b.dataConsulta) : new Date(0);
        return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else {
        return order === 'asc' ? a.paciente.localeCompare(b.paciente) : b.paciente.localeCompare(a.paciente);
      }
    });
    setPatients(sortedPatients);
  };
  

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <PatientsTableContext.Provider value={{ patients, setPatients, fetchPatients, filterPatients, loading, errorMessage  }}>
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
