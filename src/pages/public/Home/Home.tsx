import { HiOutlineSparkles } from "react-icons/hi2";
import BenefitsSection from "../../../components/BenefitsSection/BenefitsSection";
import { dadosBenefitsSection } from "./dados";
import { useNavigate } from "react-router-dom";
import { useConfigStoreSpotify } from "../../../store/useConfigStoreSpotify";

function Home() {

    const { setData } = useConfigStoreSpotify()
    const navigate = useNavigate()

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
                {/* Hero Section */}
                <section className="justify-around py-6 px-4 flex w-full flex-col md:flex-row max-md:gap-6">
                    <div className="container text-center w-full md:w-[55%] flex items-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-800 sm:mb-6 leading-tight">
                                Crie WebPages de momentos
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                    {' '}únicos e inesquecíveis
                                </span>
                            </h2>
                            <p className="max-md:hidden text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
                                Transforme momentos especiais em experiências digitais únicas. Personalize um cartão exclusivo para surpreender, emocionar e encantar quem você ama, criando uma lembrança inesquecível.
                            </p>
                            <div className="max-md:hidden flex flex-col md:flex-row justify-center items-center gap-2">
                                <button
                                    onClick={() => {
                                        setData(null)
                                        navigate(`/previa-cartao`)
                                    }}
                                    className="active:opacity-30 max-md:w-[260px] cursor-pointer inline-flex items-center justify-center space-x-2 bg-white text-purple-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <HiOutlineSparkles className="w-5 h-5" />
                                    <span>Ver como fica</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setData(null)
                                        navigate("/form-cadastro-spotify")
                                    }}
                                    className="active:opacity-30 max-md:w-[260px] cursor-pointer inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <HiOutlineSparkles className="w-5 h-5" />
                                    <span>Começar Agora</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="self-center w-[70%] max-sm:w-[200px] md:w-[25%] lg:w-[20%] py-4">
                        <img className="rotate-[-15deg] rounded-2xl w-full h-full" src="imagens/imagem5home.jpg" />
                    </div>
                    <div className="md:hidden flex flex-col md:flex-row justify-center items-center gap-2">
                        <button
                            onClick={() => {
                                setData(null)
                                navigate(`/previa-cartao`)
                            }}
                            className="active:opacity-30 max-md:w-[260px] cursor-pointer inline-flex items-center justify-center space-x-2 bg-white text-purple-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <HiOutlineSparkles className="w-5 h-5" />
                            <span>Ver como fica</span>
                        </button>
                        <button
                            onClick={() => {
                                setData(null)
                                navigate("/form-cadastro-spotify")
                            }}
                            className="active:opacity-30 max-md:w-[260px] cursor-pointer inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <HiOutlineSparkles className="w-5 h-5" />
                            <span>Começar Agora</span>
                        </button>
                    </div>

                </section>

                {/* Features Section */}
                <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="container mx-auto">
                        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
                            Por que escolher o PixelsDoAmor?
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                            {dadosBenefitsSection.map(({ icon, text, title }, index) => (
                                <BenefitsSection
                                    key={index}
                                    icon={icon}
                                    text={text}
                                    title={title}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <div className="container mx-auto text-center">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                            Pronto para criar um cartão inesquecível?
                        </h3>
                        <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
                            Junte-se a milhares de pessoas que já criaram momentos únicos
                        </p>
                        <button
                            onClick={() => navigate("/form-cadastro-spotify")}
                            className="cursor-pointer inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <HiOutlineSparkles className="w-5 h-5" />
                            <span>Criar Meu Cartão</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home;