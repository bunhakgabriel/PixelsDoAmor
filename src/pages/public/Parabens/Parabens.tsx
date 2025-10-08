import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { FiDownload, FiCopy, FiExternalLink } from "react-icons/fi";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import type { IEmail } from "../../../models/IEmail";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "../../../services/email-service";
import { SpotifyService } from "../../../services/spotify-service";
import type { ISpotifyModel } from "../../../models/ISpotify";

const Parabens = () => {
  const { encodedUrl } = useParams();
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartaoStorage, setCartaoStorage] = useState<ISpotifyModel>({} as ISpotifyModel)
  const [emailEnviado, setEmailEnviado] = useState(false)

  const mutation = useMutation({
    mutationFn: (data: IEmail) => sendEmail(data),
    onSuccess: () => {
      setEmailEnviado(true)
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const mutationAlterarStatus = useMutation({
    mutationFn: ({ idDocumento, status }: { idDocumento: string; status: string }) => {
      return SpotifyService.atualizarStatus(idDocumento, status)
    },
    onSuccess: (response) => { console.log(response) },
    onError: (err) => { console.log(err) }
  })

  const cardUrl = encodedUrl
    ? "https://pixelsdoamor.site/cartao-digital/" +
    decodeURIComponent(encodedUrl)
    : "";

  const enviarEmail = async (qrDataUrl: string) => {
    const cartaoStorage = JSON.parse(localStorage.getItem('cartao-atual') || "{}")
    if (!cartaoStorage || cartaoStorage.emailEnviado) return

    setCartaoStorage(cartaoStorage)

    const emailData: IEmail = {
      qrDataUrl: qrDataUrl,
      linkCartao: cardUrl,
      destinatario: cartaoStorage.email
    }

    mutation.mutate(emailData)
  }

  useEffect(() => {
    if (emailEnviado && cartaoStorage) {
      localStorage.setItem('cartao-atual', JSON.stringify({ ...cartaoStorage, emailEnviado: true }))
      mutationAlterarStatus.mutate({ idDocumento: cartaoStorage.id || '', status: 'ativo' })
    }
  }, [emailEnviado, cartaoStorage])

  useEffect(() => {
    const generateQRCode = async () => {
      if (cardUrl) {
        try {
          setIsLoading(true);
          const qrDataUrl = await QRCode.toDataURL(cardUrl, {
            width: 200,
            margin: 2,
            color: {
              dark: "#1f2937",
              light: "#ffffff",
            },
          });
          setQrCodeUrl(qrDataUrl);
          await enviarEmail(qrDataUrl)
        } catch (error) {
          console.error("Erro ao gerar QR Code:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    generateQRCode();
  }, [cardUrl]);

  // Copiar link para clipboard
  const handleCopyLink = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(cardUrl);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
        return;
      } catch (err) {
        console.error("Erro ao copiar com navigator.clipboard:", err);
      }
    }

    // Fallback para mobile/navegadores antigos
    const textArea = document.createElement("textarea");
    textArea.value = cardUrl;
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

  // Download do QR Code
  const handleDownloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = "cartao-digital-qrcode.png";
      link.href = qrCodeUrl;
      link.click();
    }
  };

  // Fallback para Instagram: baixar QR Code
  const handleInstagramShare = () => {
    alert(
      "No Instagram Web não é possível compartilhar links diretamente.\nVocê pode baixar o QR Code e postar nos Stories."
    );
    handleDownloadQR();
  };

  if (!cardUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">URL não encontrada</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center md:p-6">
        <div className="max-w-lg w-full">
          <div className="bg-white/10 md:backdrop-blur-xl md:rounded-3xl p-4 md:p-8 shadow-2xl md:border md:border-white/20">
            {/* Mensagem */}
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-white mb-4 animate-fade-in">
                🎉 Parabéns!
              </h1>
              <p className="text-xl text-white/90 mb-2">
                Seu cartão digital foi criado com sucesso!
              </p>
              <p className="text-white/70 text-sm">
                Use o QR Code abaixo para compartilhar seu cartão
              </p>
            </div>

            {/* QR Code */}
            <div className="text-center mb-4">
              <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                {isLoading ? (
                  <div className="w-48 h-48 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  </div>
                ) : (
                  <img
                    src={qrCodeUrl}
                    alt="QR Code do Cartão Digital"
                    className="w-48 h-48"
                  />
                )}
              </div>
            </div>

            <div className="p-4">
              <p className="text-white/70 text-sm text-center">
                ✉️ O seu link + QR Code de acesso foi enviado para seu e-mail!
                Ele pode levar até 5 minutos para chegar à sua caixa de entrada.
              </p>
            </div>

            {/* Link do cartão */}
            <div className="mb-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <p className="text-white/70 text-sm mb-2">
                  Link do seu cartão:
                </p>
                <div className="flex items-center gap-2 text-white text-sm font-mono break-all">
                  <FiExternalLink className="w-4 h-4 flex-shrink-0" />
                  {cardUrl}
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="grid grid-cols-1 gap-4">
              {/* Copiar link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30"
              >
                <FiCopy className="w-4 h-4" />
                {showCopySuccess ? "Copiado!" : "Copiar link"}
              </button>

              <p className="text-white/70 text-md text-center">
                Compartilhe também nas suas redes sociais!
              </p>

              {/* WhatsApp */}
              <WhatsappShareButton
                url={cardUrl}
                title="Confira meu cartão digital!"
              >
                <div className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200">
                  <WhatsappIcon size={24} round />
                  WhatsApp
                </div>
              </WhatsappShareButton>

              {/* Facebook */}
              <FacebookShareButton
                url={cardUrl}
                hashtag="Confira meu cartão digital!"
              >
                <div className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200">
                  <FacebookIcon size={24} round />
                  Facebook
                </div>
              </FacebookShareButton>

              {/* Instagram (via download do QR Code) */}
              <button
                onClick={handleInstagramShare}
                className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                Instagram
              </button>

              {/* Download QR Code */}
              <button
                onClick={handleDownloadQR}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiDownload className="w-4 h-4" />
                Baixar QR Code
              </button>
            </div>

            {/* Mensagem de sucesso para copy */}
            {showCopySuccess && (
              <div className="mt-4 text-center">
                <div className="inline-block bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                  ✅ Link copiado para a área de transferência!
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              Agora você pode compartilhar seu cartão digital com qualquer
              pessoa!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default Parabens;
