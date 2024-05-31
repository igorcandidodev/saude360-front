import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

export class AuthenticationService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}


  public async login(auth: any) {
    const response = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/authentication/login`, auth);

    if(response.status === 200){
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  }

}