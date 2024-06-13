import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class AxiosInterceptor {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();

    this.axiosInstance.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    );

    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleResponseError
    );
  }

  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = localStorage.getItem("token");

    // if (!config.url.includes("/api/authentication/login")) {
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   } else {
    //     console.warn("Token não encontrado");
    //     window.location.href = '/login';
    //   }
    // }
    if (config.url.search("/api/authentication/login")) {
      return config;
    }
    console.log(config)
    
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  }

  private handleRequestError(error: any) {
    return Promise.reject(error);
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleResponseError(error: any) {
    
    if (error.response && error.response.status === 403) {
     
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
