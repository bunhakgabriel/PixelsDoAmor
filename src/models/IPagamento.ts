export interface IPagamento {
  firstName: string;
  lastName: string;
  email: string;
  documentType: "CPF" | "CNPJ";
  documentNumber: string;
}

export interface MercadoPagoPagamentoRequest {
  description: string;
  payment_method_id: "pix";
  payer: {
    email: string;
    first_name: string;
    last_name: string;
    identification: {
      type: "CPF" | "CNPJ";
      number: string;
    };
  };
}

export type PixResponse = {
  id: string;
  point_of_interaction?: {
    transaction_data?: {
      qr_code_base64: string;
      qr_code: string;
    };
  };
};