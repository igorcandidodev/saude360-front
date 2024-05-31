import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class AxiosInterceptor {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();

    this.axiosInstance.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    );

    // this.axiosInstance.interceptors.response.use(
    //   this.handleResponse,
    //   this.handleResponseError
    // );
  }



  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = localStorage.getItem("token");
    
    // config.headers.Authorization = token

    return config;
  }

  private handleRequestError(error: any) {
    return error;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleResponseError(error: any) {
    return error;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}