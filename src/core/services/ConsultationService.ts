import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

export class ConsultationService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async findAllByPatientId(patientId: number) {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/consultation/patient/${patientId}`);
    return response.data;
  }

}