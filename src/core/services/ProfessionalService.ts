import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

class ProfessionalService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async getProfessional(id: string) {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/professionals/${id}`);
    return response.data;
  }

  public async createProfessional(professional: any) {
    const response = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/user/professional/`, professional);
    return response.data;
  }

  public async updateProfessional() {
    const response = await this.axiosInstance.put(`${import.meta.env.VITE_API_URL}/user/professional/`);
    return response.data;
  }
}

export default ProfessionalService;
