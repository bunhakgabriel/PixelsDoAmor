import type { ReactNode } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuMusic } from "react-icons/lu";

export const dadosBenefitsSection = [
    {
        icon: <HiOutlineSparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
        title: 'Fácil de usar',
        text: 'Interface intuitiva para criar cartões em minutos'
    },
    { 
        icon: <CiHeart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />, 
        title: 'Personalização', 
        text: 'Temas únicos inspirados nas suas plataformas favoritas' 
    },
    { 
        icon: <LuMusic className="w-6 h-6 sm:w-8 sm:h-8 text-white" />, 
        title: 'Multimídia', 
        text: 'Fotos, música e vídeos em um só lugar' 
    },
    { 
        icon: <FaRegStar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />, 
        title: 'Compartilhamento', 
        text: 'Compartilhe facilmente com amigos e familiares' 
    }
] as { icon: ReactNode, title: string, text: string }[]