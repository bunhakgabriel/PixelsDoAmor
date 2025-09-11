import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import {
    FiShare2,
    FiDownload,
    FiCopy,
    FiExternalLink
} from 'react-icons/fi';

const Parabens = () => {
    const { encodedUrl } = useParams();
    const navigate = useNavigate();
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const cardUrl = encodedUrl ? decodeURIComponent(encodedUrl) : '';

    useEffect(() => {
        const generateQRCode = async () => {
            if (cardUrl) {
                try {
                    setIsLoading(true);
                    const qrDataUrl = await QRCode.toDataURL(cardUrl, {
                        width: 200,
                        margin: 2,
                        color: {
                            dark: '#1f2937',
                            light: '#ffffff'
                        }
                    });
                    setQrCodeUrl(qrDataUrl);
                } catch (error) {
                    console.error('Erro ao gerar QR Code:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        generateQRCode();
    }, [cardUrl]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(cardUrl);
            setShowCopySuccess(true);
            setTimeout(() => setShowCopySuccess(false), 2000);
        } catch (error) {
            console.error('Erro ao copiar link:', error);
        }
    };

    const handleDownloadQR = () => {
        if (qrCodeUrl) {
            const link = document.createElement('a');
            link.download = 'cartao-digital-qrcode.png';
            link.href = qrCodeUrl;
            link.click();
        }
    };

    const handleShareCard = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Meu Cartão Digital',
                    text: 'Confira meu cartão digital!',
                    url: cardUrl
                });
            } catch (error) {
                console.error('Erro ao compartilhar:', error);
            }
        } else {
            handleCopyLink();
        }
    };

    if (!cardUrl) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
                <div className="text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">URL não encontrada</h2>
                    <button
                        onClick={() => navigate('/')}
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
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center md:p-6">
                <div className="max-w-lg w-full">
                    {/* Card principal */}
                    <div className="bg-white/10 md:backdrop-blur-xl md:rounded-3xl p-4 md:p-8 shadow-2xl md:border md:border-white/20">
                        {/* Ícone de sucesso animado */}
                        {/* <div className="text-center mb-8">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-lg animate-pulse"></div>
                                <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4 shadow-lg">
                                    <FiCheckCircle className="w-12 h-12 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2">
                                    <FiStar className="w-6 h-6 text-yellow-400 animate-bounce" />
                                </div>
                            </div>
                        </div> */}

                        {/* Mensagem de parabéns */}
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

                        {/* URL do cartão */}
                        <div className="mb-4">
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <p className="text-white/70 text-sm mb-2">Link do seu cartão:</p>
                                <div className="flex items-center gap-2 text-white text-sm font-mono break-all">
                                    <FiExternalLink className="w-4 h-4 flex-shrink-0" />
                                    {cardUrl}
                                </div>
                            </div>
                        </div>

                        {/* Botões de ação */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30"
                            >
                                <FiCopy className="w-4 h-4" />
                                {showCopySuccess ? 'Copiado!' : 'Copiar'}
                            </button>

                            <button
                                onClick={handleShareCard}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <FiShare2 className="w-4 h-4" />
                                Compartilhar
                            </button>

                            <button
                                onClick={handleDownloadQR}
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiDownload className="w-4 h-4" />
                                QR Code
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
                            Agora você pode compartilhar seu cartão digital com qualquer pessoa!
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
        </div>
    );
};

export default Parabens;
