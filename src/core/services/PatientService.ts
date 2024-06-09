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

}

export default PatientService;
