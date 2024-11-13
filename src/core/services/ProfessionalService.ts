import { AxiosInterceptor } from "../interceptor/axiosInterceptor";
import axios from "axios";

class ProfessionalService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async getProfessional(id: string) {
    const response = await this.axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/professionals/${id}`
    );
    return response.data;
  }

  public async createProfessional(professional: any) {
    // Criando uma instância temporária sem o header Authorization
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/professional/`,
      professional,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }

  public async updateProfessional(updatedData: {
    fullName: string;
    cpf: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
    healthSectorsNames?: string[];
    cnsNumber?: string;
  }) {
    try {
      const response = await this.axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/user/professional/`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar os dados do profissional:", error);
      throw error;
    }
  }
}

export default ProfessionalService;
