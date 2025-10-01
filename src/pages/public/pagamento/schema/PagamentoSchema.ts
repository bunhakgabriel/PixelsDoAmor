import * as Yup from "yup";

export const PagamentoSchema = Yup.object({
  firstName: Yup.string().required("Nome é obrigatório"),
  lastName: Yup.string().required("Sobrenome é obrigatório"),
  email: Yup.string()
    .transform((v) => (typeof v === 'string' ? v.trim().toLowerCase() : v))
    .email("Email inválido")
    .required("Email é obrigatório"),
  documentType: Yup.string().oneOf(["CPF", "CNPJ"]).required("Selecione o tipo de documento"),
  documentNumber: Yup
    .string()
    .transform((v) => (typeof v === 'string' ? v.replace(/\D/g, '') : v))
    .required("Número do documento é obrigatório")
    .when('documentType', (documentType: any, schema) => {
      const docType = Array.isArray(documentType) ? documentType[0] : documentType;
    
      if (docType === 'CPF') {
        return schema.length(11, 'CPF deve ter 11 dígitos');
      }
      if (docType === 'CNPJ') {
        return schema.length(14, 'CNPJ deve ter 14 dígitos');
      }
      return schema;
    }),
});