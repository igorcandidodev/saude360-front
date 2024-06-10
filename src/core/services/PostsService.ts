import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

class PostsService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async createPost(post: any, userId: string) {
    const response = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/orientation/patient/${userId}`, post);
    return response.data;
  }

  public async getPosts(userId: string) {
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/orientation/patient/${userId}`);
    return response.data;
  }

  public async createResponse(response: any, orientationId: string) {
    const responseResult = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/orientation-responses/${orientationId}`, response);
    return responseResult.data;
  }

  public async getResponses(orientationId: string) {
    const responseResult = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/orientation-responses/${orientationId}`);
    return responseResult.data;
  }

}

export default PostsService;
