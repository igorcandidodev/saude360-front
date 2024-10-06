import { AxiosInterceptor } from "../interceptor/axiosInterceptor";

class TransactionService {
  private axiosInterceptor: AxiosInterceptor = new AxiosInterceptor();
  private axiosInstance = this.axiosInterceptor.getAxiosInstance();

  constructor() {}

  public async getAllTransactions() {
    try {
      const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/transaction/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter transações:", error);
      throw error;
    }
  }

  public async getTransactionById(id: string) {
    try {
      const response = await this.axiosInstance.get(`${import.meta.env.VITE_API_URL}/transaction/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter transação com ID ${id}:`, error);
      throw error;
    }
  }

  public async createTransaction(transaction: any) {
    try {
      const response = await this.axiosInstance.post(`${import.meta.env.VITE_API_URL}/transaction/`, transaction);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      throw error;
    }
  }

  public async updateTransactionById(id: string, transaction: any) {
    try {
      const response = await this.axiosInstance.put(`${import.meta.env.VITE_API_URL}/transaction/${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar transação com ID ${id}:`, error);
      throw error;
    }
  }

  public async deleteTransactionById(id: string) {
    try {
      const response = await this.axiosInstance.delete(`${import.meta.env.VITE_API_URL}/transaction/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar transação com ID ${id}:`, error);
      throw error;
    }
  }
}

export default TransactionService;
