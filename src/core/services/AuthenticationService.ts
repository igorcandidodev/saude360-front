import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

export class AuthenticationService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async login(auth: any) {
    const response = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/authentication/login`, auth);
    return response.data; // Retorne os dados, incluindo o ID do usuário
  }
}
