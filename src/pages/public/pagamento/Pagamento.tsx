import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser, FaEnvelope, FaIdCard } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useConfigStoreSpotify } from "../../../store/useConfigStoreSpotify";
import type { ISpotifyModel } from "../../../models/ISpotify";
import type {
  IPagamento,
  MercadoPagoPagamentoRequest,
  PixResponse,
} from "../../../models/IPagamento";
import { PagamentoSchema } from "./schema/PagamentoSchema";
import { useMutation } from "@tanstack/react-query";
import { pagamentoService } from "../../../services/pagamento-service";
import { toast } from "react-toastify";
import ButtonUi from "../../../components/ButtonUi/ButtonUi";
import { useNavigate } from "react-router-dom";
import useMask from "../../../hooks/useMask";

export default function PagamentoPage() {
  const [processandoPagamento, setProcessandoPagamento] = useState<{
    id: string;
    status: boolean;
  }>({ id: "", status: false });
  const [pixBase64, setPixBase64] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [dataStorage] = useState<ISpotifyModel>(
    JSON.parse(localStorage.getItem("cartao-atual") || "null")
  );
  const [timer, setTimer] = useState(60);

  const { data } = useConfigStoreSpotify();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IPagamento>({
    resolver: yupResolver(PagamentoSchema),
  });

  const { mask } = useMask();
  const tipoDocumento = watch("documentType");

  const mutation = useMutation({
    mutationFn: (data: MercadoPagoPagamentoRequest) =>
      pagamentoService.gerarPix(data),
    onSuccess: (result: PixResponse) => {
      if (result?.point_of_interaction?.transaction_data?.qr_code_base64) {
        setPixBase64(
          result.point_of_interaction.transaction_data.qr_code_base64
        );
        setPixCode(result.point_of_interaction.transaction_data.qr_code);
        setProcessandoPagamento({ id: result.id, status: true });
      } else {
        toast.error("Não foi possível gerar QR Code Pix, tente novamente!");
      }
    },
    onError: (error) => {
      console.log("Erro ao salvar: ", error);
      toast.error("Erro ao gerar QrCode Pix, tente novamente!");
    },
  });

  const onSubmit = (data: IPagamento) => {
    const body: MercadoPagoPagamentoRequest = {
      description: "Pagamento cartão digital",
      payment_method_id: "pix",
      payer: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        identification: {
          type: data.documentType,
          number: data.documentNumber,
        },
      },
    };
    mutation.mutate(body);
  };

  const aguardarProcessamentoPagamento = () => {
    toast.info("Aguarde 1 minuto enquanto processamos seu pagamento... ", {
      autoClose: 5000,
    });
    const toastId = "nao-localizado-pagamento";
    const cronometro = setInterval(() => {
      setTimer((prev) => {
        prev = prev - 1;
        if (prev === 0) {
          clearInterval(cronometro);
          toast.info(
            "Não localizamos seu pagamento, se você já o realizou, por favor entre em contato com o suporte para liberarmos sua WebPage",
            { autoClose: 15000, toastId }
          );
          return 60;
        }
        return prev;
      });
    }, 1000);
  };

  const processarPagamento = () => {
    const interval = setInterval(async () => {
      console.log("Iniciando verificação de pagamento a cada 5 segundos...");
      try {
        const status = await pagamentoService.consultarPagamento(
          processandoPagamento.id
        );
        if (status === "approved") {
          clearInterval(interval);
          toast.success("Pagamento aprovado com sucesso!", {
            autoClose: 1500,
          });
          setTimeout(() => {
            const encodedUrl = encodeURIComponent(
              data?.id || dataStorage?.id || ""
            );
            navigate(`/parabens/1${encodedUrl}`);
          }, 1500);
        }
      } catch (error) {
        console.error("Erro ao consultar pagamento:", error);
      }
    }, 5000);
  };

  const copiarLinkPagamento = async () => {
    if (!pixCode) return

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(pixCode);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
        return;
      } catch (err) {
        console.error("Erro ao copiar com navigator.clipboard:", err);
      }
    }

    // Fallback para mobile/navegadores antigos
    const textArea = document.createElement("textarea");
    textArea.value = pixCode;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar com execCommand:", err);
    }
    document.body.removeChild(textArea);
  };

  useEffect(() => {
    console.log("Processando pagamento:", processandoPagamento);
    if (processandoPagamento.status) {
      processarPagamento();
    }
  }, [processandoPagamento]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-950/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <h1 className="text-2xl font-bold text-white">Finalizar Compra</h1>
          <p className="text-gray-400">Plano Básico - Pagamento Único</p>
          <div className="mt-3 text-3xl font-extrabold text-green-400">
            R$ 14,90
          </div>
        </div>

        {!pixBase64 ? (
          // Formulário
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Seção Informações Pessoais */}
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <FaUser className="w-5 h-5 text-blue-400" /> Informações
                Pessoais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Controller
                    control={control}
                    name="firstName"
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={(e) => field.onChange(mask(e.target.value, "apenasLetras"))}
                        placeholder="Nome"
                        className="w-full border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    control={control}
                    name="lastName"
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={(e) => field.onChange(mask(e.target.value, "apenasLetras"))}
                        placeholder="Sobrenome"
                        className="w-full border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 relative">
                <FaEnvelope className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="email"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(mask(e.target.value, "email"))}
                      placeholder="Email"
                      className="w-full pl-10 border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
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
                  {errors.documentType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.documentType.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    control={control}
                    name="documentNumber"
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={(e) =>
                          field.onChange(
                            mask(
                              e.target.value,
                              tipoDocumento === "CNPJ" ? "cnpj" : "cpf"
                            )
                          )
                        }
                        placeholder="Número do documento"
                        className="w-full border border-gray-700 bg-gray-900/60 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    )}
                  />
                  {errors.documentNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.documentNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Botão */}
            <button
              disabled={mutation.isPending}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center gap-2"
            >
              {mutation.isPending ? 'Gerando QrCode...' : '💳 Gerar QR Code PIX'}
            </button>
          </form>
        ) : (
          // Seção QR Code
          <div className="p-8 text-center space-y-6">
            <h2 className="text-xl font-bold text-white">Pagamento via PIX</h2>
            <p className="text-gray-400">
              Escaneie o QR Code com seu aplicativo de banco ou copie a chave
              PIX abaixo para realizar o pagamento.
            </p>

            <div className="flex justify-center">
              <img
                src={`data:image/png;base64,${pixBase64}`}
                alt="QR Code Pix"
                className="w-48 h-48"
              />
            </div>

            {/* Copia e cola */}
            <div className="bg-gray-800 rounded-xl p-3 flex items-center justify-between">
              <span className="text-gray-300 text-sm truncate">{pixCode}</span>
              <button
                onClick={copiarLinkPagamento}
                className="text-blue-400 hover:underline ml-3 text-sm"
              >
                Copiar
              </button>
            </div>

            {showCopySuccess && (
              <div className="mt-4 text-center">
                <div className="inline-block bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                  ✅ Pix copiado para a área de transferência!
                </div>
              </div>
            )}

            <ButtonUi
              className="w-[100%] h-[40px] sm:my-4"
              text={`${timer < 60
                ? `Aguardando confirmação do pagamento... (${timer}s)`
                : "Já realizei o pagamento"
                }`}
              onClick={() => {
                if (timer < 60) return;
                aguardarProcessamentoPagamento();
              }}
            />
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="flex items-center gap-2">🔒 Pagamento 100% seguro</p>
          <p className="flex items-center gap-2">
            ⚡ Protegido por Mercado Pago
          </p>
        </div>
      </div>
    </div>
  );
}
