import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper"
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import 'swiper/swiper-bundle.css';
import { BsImage } from "react-icons/bs";
import type { Imagem } from "../../../../../models/ISpotify";

type AlbumMemoriasProps = {
    fotos: Imagem[]
}

function AlbumMemorias1({ fotos }: AlbumMemoriasProps) {
    let passar: SwiperType;

    const scrollLeft = () => {
        passar?.slidePrev();
    };

    const scrollRight = () => {
        passar?.slideNext();
    };

    if(!fotos || fotos.length == 0) return <></>

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
                        slidesPerView={4.4}
                        onSwiper={(swiper) => (passar = swiper)}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                            300: {
                                slidesPerView: 1.2,
                            },
                            400: {
                                slidesPerView: 1.4,
                            },
                            500: {
                                slidesPerView: 1.6,
                            }
                        }}
                    >
                        {fotos.map((foto, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md"
                                >
                                    <img
                                        src={foto.imagem instanceof File ? foto.previewImagem : foto.imagem}
                                        className="w-full h-40 md:h-48 object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default AlbumMemorias1