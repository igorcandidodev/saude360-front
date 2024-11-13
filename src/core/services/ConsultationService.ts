import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

export class ConsultationService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async createConsultation(patientId: string, consultation: any) {
    const response = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/consultation/${patientId}`, consultation);
    return response.data;
  }

  public async updateConsultation(Id: string, consultation: any) {
    const response = await this.axiosInstance.put(`${import.meta.env.VITE_API_URL}/consultation/${Id}`, consultation);
    return response.data;
  }

  public async getAllConsultation() {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/consultation/`);
    return response.data;
  }

  public async deleteConsultation(id: string) {
    const response = await this.axiosInstance.delete(`${import.meta.env.VITE_API_URL}/consultation/${id}`);
    return response.data;
  }

  public async findAllByPatientId(patientId: number) {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/consultation/patient/${patientId}`);
    return response.data;
  }

  public async findAllByPatient() {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/consultation/patient/`);
    return response.data;
  }

  public async addEvolutionHistory(consultationId: number, evolutionHistory: any) {
    const response = await this.axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/consultation/${consultationId}/evolution-history`, 
      evolutionHistory
    );
    return response.data;
  }
}





