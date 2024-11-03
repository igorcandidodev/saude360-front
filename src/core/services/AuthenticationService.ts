import axios from "axios";
import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

export class AuthenticationService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async login(auth: any) {
    const response = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/authentication/login`, auth);
    return response.data; // Retorne os dados, incluindo o ID do usuário
  }

  public async sendPasswordResetCode(cpf: string) {
    const response = await this.axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/user/forget-password/${cpf}`,
    );
    
    console.log('response', response);
    return response.data;
  }

  public async resetPassword(code: string, password: string) {
    const requestBody = {
      code: code,
      password: password
    };

    const response = await this.axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/user/reset-password`,
      requestBody
    );
    return response.data; 
  }

}
