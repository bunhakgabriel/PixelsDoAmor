import type {
  MercadoPagoPagamentoRequest,
  PixResponse,
} from "../models/IPagamento";

export const pagamentoService = {
  gerarPix: async (data: MercadoPagoPagamentoRequest): Promise<PixResponse> => {
    try {
      const response = await fetch("https://servidor-node-6up1.onrender.com/process_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erro ao buscar documento:", error);
      throw error;
    }
  },
  consultarPagamento: async (id: string): Promise<string> => {
    try {
        const res = await fetch(
          `https://servidor-node-6up1.onrender.com/payment_status/${id}`
        );
        const data = await res.json();
        return data.status;
      } catch (error) {
        console.error("Erro ao verificar status:", error);
        throw error;
      }
  }
};
