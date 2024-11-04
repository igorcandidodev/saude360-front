import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

class PatientService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async createPatient(patient: any) {
    const response = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/user/patient/`, patient);
    return response.data;
  }

  public async getPatientsTable() {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/user/patient/consultation-and-orientation`);
    return response.data;
  }

  public async getAllPatients() {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/user/patient/`);
    return response.data;
  }

  public async getPatientById(patientId: number) {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/user/patient/${patientId}`);
    return response.data;
  }

  public async updatePatient(patientId: number, patientData: any) {
    const response = await this.axiosInstance.put(`${import.meta.env.VITE_API_URL}/user/patient/${patientId}`, patientData);
    return response.data;
  }

  public async updatePatientByToken(updatedData: {
    fullName?: string;
    cpf?: string;
    birthDate?: string;
    email?: string;
    phoneNumber?: string;
    address?: {
      street?: string;
      number?: string;
      complement?: string;
      cep?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
    };
  }) {
    try {
      const response = await this.axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/user/patient/`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar os dados do paciente:", error);
      throw error;
    }
  }

}

export default PatientService;
