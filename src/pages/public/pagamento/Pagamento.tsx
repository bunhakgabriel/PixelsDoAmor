import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUser, FaEnvelope, FaIdCard } from "react-icons/fa";
import { useState } from "react";
import QRCode from "react-qr-code";


// Tipagem dos dados do formulário
type PaymentFormData = {
  firstName: string;
  lastName: string;
  email: string;
  documentType: "CPF" | "CNPJ";
  documentNumber: string;
};

// Schema de validação com Yup
const schema = yup.object({
  firstName: yup.string().required("Nome é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  documentType: yup.string().oneOf(["CPF", "CNPJ"]).required("Selecione o tipo de documento"),
  documentNumber: yup
    .string()
    .required("Número do documento é obrigatório")
    .matches(/^[0-9]+$/, "Apenas números são permitidos"),
});

export default function PagamentoPage() {
  const [showPix, setShowPix] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(schema),
  });

  const fakePixKey = "00020126460014br.gov.bcb.pix0114+551199999999520400005303986540518.995802BR5925Cliente Teste de Exemplo6009SAO PAULO62070503***6304ABCD";

  const onSubmit = (data: PaymentFormData) => {
    console.log("Dados enviados:", data);
    setShowPix(true); // Exibe a seção com o QRCode
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-950/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <h1 className="text-2xl font-bold text-white">Finalizar Compra</h1>
          <p className="text-gray-400">Plano Básico - Pagamento Único</p>
          <div className="mt-3 text-3xl font-extrabold text-green-400">R$ 18,99</div>
        </div>

        {!showPix ? (
          // Formulário
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Seção Informações Pessoais */}
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <FaUser className="w-5 h-5 text-blue-400" /> Informações Pessoais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    {...register("firstName")}
                    placeholder="Nome"
                    className="w-full border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Sobrenome"
                    className="w-full border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="mt-4 relative">
                <FaEnvelope className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full pl-10 border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Seção Documento */}
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <FaIdCard className="w-5 h-5 text-green-400" /> Documento
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select
                    {...register("documentType")}
                    className="w-full border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                  </select>
                  {errors.documentType && <p className="text-red-500 text-sm mt-1">{errors.documentType.message}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    {...register("documentNumber")}
                    placeholder="Número do documento"
                    className="w-full border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.documentNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.documentNumber.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center gap-2"
            >
              💳 Gerar QR Code PIX
            </button>
          </form>
        ) : (
          // Seção QR Code
          <div className="p-8 text-center space-y-6">
            <h2 className="text-xl font-bold text-white">Pagamento via PIX</h2>
            <p className="text-gray-400">
              Escaneie o QR Code com seu aplicativo de banco ou copie a chave PIX abaixo para realizar o pagamento.
            </p>

            <div className="flex justify-center">
              <QRCode value={fakePixKey} size={200} fgColor="#000000" bgColor="#ffffff" />
            </div>

            {/* Copia e cola */}
            <div className="bg-gray-800 rounded-xl p-3 flex items-center justify-between">
              <span className="text-gray-300 text-sm truncate">{fakePixKey}</span>
              <button
                onClick={() => navigator.clipboard.writeText(fakePixKey)}
                className="text-blue-400 hover:underline ml-3 text-sm"
              >
                Copiar
              </button>
            </div>

            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition">
              Já realizei o pagamento
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="flex items-center gap-2">🔒 Pagamento 100% seguro</p>
          <p className="flex items-center gap-2">⚡ Protegido por Mercado Pago</p>
        </div>
      </div>
    </div>
  );
}
