import React, { createContext, useState, useEffect, useContext } from "react";
import ConsultationService from "../core/services/ConsultationService";

interface Consultation {
  id: string;
  date: string;
  startServiceDateAndTime: string;
  endServiceDateAndTime: string;
  title: string;
  description: string;
  color: string;
}

interface ConsultationContextType {
  consultations: Consultation[];
  getConsultations: () => Promise<void>;
  createConsultation: (patientId: string, consultationData: Consultation) => Promise<void>;
  updateConsultation: (id: string, consultationData: Consultation) => Promise<void>;
  deleteConsultation: (id: string) => Promise<void>;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

const ConsultationProvider = ({ children }) => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const consultationService = new ConsultationService();

  const getConsultations = async () => {
    try {
      const consultationsData = await consultationService.getAllConsultation();
      setConsultations(consultationsData);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  const createConsultation = async (patientId: string, consultationData: Consultation) => {
    try {
      const newConsultation = await consultationService.createConsultation(patientId, consultationData);
      setConsultations((prevConsultations) => [...prevConsultations, newConsultation]);
    } catch (error) {
      console.error("Error creating consultation:", error);
    }
  };

  const updateConsultation = async (id: string, consultationData: Consultation) => {
    try {
      await consultationService.updateConsultation(id, consultationData);
      setConsultations((prevConsultations) =>
        prevConsultations.map((consultation) =>
          consultation.id === id ? { ...consultation, ...consultationData } : consultation
        )
      );
    } catch (error) {
      console.error("Error updating consultation:", error);
    }
  };

  const deleteConsultation = async (id: string) => {
    try {
      await consultationService.deleteConsultation(id);
      setConsultations((prevConsultations) =>
        prevConsultations.filter((consultation) => consultation.id !== id)
      );
    } catch (error) {
      console.error("Error deleting consultation:", error);
    }
  };

  useEffect(() => {
    getConsultations();
  }, []);

  return (
    <ConsultationContext.Provider
      value={{ consultations, getConsultations, createConsultation, updateConsultation, deleteConsultation }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

const useConsultations = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error(
      "useConsultations must be used within a ConsultationProvider"
    );
  }
  return context;
};

export { ConsultationProvider, useConsultations };
