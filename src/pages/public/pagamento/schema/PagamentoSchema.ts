import * as Yup from "yup";

export const PagamentoSchema = Yup.object({
  firstName: Yup.string().required("Nome é obrigatório"),
  lastName: Yup.string().required("Sobrenome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  documentType: Yup.string().oneOf(["CPF", "CNPJ"]).required("Selecione o tipo de documento"),
  documentNumber: Yup
    .string()
    .required("Número do documento é obrigatório")
    .matches(/^[0-9]+$/, "Apenas números são permitidos"),
});