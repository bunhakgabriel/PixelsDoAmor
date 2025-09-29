import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper"
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import 'swiper/swiper-bundle.css';
import { BsImage } from "react-icons/bs";
import type { Imagem } from "../../../../../models/ISpotify";
import { ImageModal } from "../../../../Modal/Modal";
import clsx from "clsx";

type AlbumMemoriasProps = {
    fotos: Imagem[]
    variant: 'preview' | 'modal' | 'page'
}

const configSwiper = {
    300: {
        slidesPerView: 1.2,
    },
    400: {
        slidesPerView: 1.4,
    },
    500: {
        slidesPerView: 1.6,
    }
}

function AlbumMemorias1({ fotos, variant }: AlbumMemoriasProps) {
    let passar: SwiperType;
    
    // Estados para o modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const scrollLeft = () => {
        passar?.slidePrev();
    };

    const scrollRight = () => {
        passar?.slideNext();
    };

    // Funções para controlar o modal
    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goToNextImage = () => {
        setSelectedImageIndex((prev) => 
            prev === fotos.length - 1 ? 0 : prev + 1
        );
    };

    const goToPreviousImage = () => {
        setSelectedImageIndex((prev) => 
            prev === 0 ? fotos.length - 1 : prev - 1
        );
    };

    if (!fotos || fotos.length == 0) return <></>

    return (
        <div className="text-white font-sans">
            <div className="py-section flex flex-col gap-5 w-full">
                <div className="flex justify-between gap-4 items-center">
                    <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                        Álbum de Memórias <span className="text-green-400 hidden sm:block"><BsImage /></span>
                    </h2>
                    <div className="flex items-center justify-center space-x-4">
                        <button onClick={scrollLeft} className="cursor-pointer w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-md hover:bg-gray-200 transition">
                            <FaChevronLeft className="text-sm text-gray-800" />
                        </button>
                        <button onClick={scrollRight} className="cursor-pointer w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-md hover:bg-gray-200 transition">
                            <FaChevronRight className="text-sm text-gray-800" />
                        </button>
                    </div>
                </div>
                <div>
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={1.6}
                        onSwiper={(swiper) => (passar = swiper)}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{...configSwiper}}
                    >
                        {fotos.map((foto, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="relative bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md cursor-pointer group hover:scale-105 transition-transform duration-200"
                                    onClick={() => openModal(index)}
                                >
                                    <img
                                        src={foto.imagem instanceof File ? foto.previewImagem : foto.imagem}
                                        className={clsx('w-full object-cover h-44 md:h-48 group-hover:brightness-110 transition-all duration-200',{
                                            'lg:h-58': variant != 'preview'
                                        })}
                                        alt={`Memória ${index + 1}`}
                                    />
                                    {/* Overlay sutil para indicar que é clicável */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <BsImage className="text-white text-2xl" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            
            {/* Modal para visualização das imagens */}
            <ImageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                images={fotos}
                currentIndex={selectedImageIndex}
                onNext={goToNextImage}
                onPrevious={goToPreviousImage}
            />
        </div>
    );
}

export default AlbumMemorias1