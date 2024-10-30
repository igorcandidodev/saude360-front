import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

class UserService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async getUserByCpf(cpf: string) {
    console.log(`${import.meta.env.URL}`)
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/user/${cpf}`);
    return response.data;
  }

}

export default UserService;