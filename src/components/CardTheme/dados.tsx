import { CiCamera, CiHeart } from "react-icons/ci"
import { FaRegStar } from "react-icons/fa"
import { IoVideocamOutline } from "react-icons/io5"
import { LuMusic } from "react-icons/lu"

export const dados = {
        spotify: {
            icon: <LuMusic className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
            title: 'Spotify',
            descriptionList: [
                { icon: <CiHeart className="w-4 h-4 flex-shrink-0" />, text: 'Fotos como capas de álbuns' },
                { icon: <LuMusic className="w-4 h-4 flex-shrink-0" />, text: 'Trilha sonora personalizada' },
                { icon: <FaRegStar className="w-4 h-4 flex-shrink-0" />, text: 'Playlist dos momentos' },
            ]
        },
        netflix: {
            icon: <IoVideocamOutline className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />,
            title: 'Netflix',
            descriptionList: [
                { icon: <IoVideocamOutline className="w-4 h-4 flex-shrink-0" />, text: 'Trailer dos melhores momentos' },
                { icon: <CiHeart className="w-4 h-4 flex-shrink-0" />, text: 'Recomendações personalizadas' },
                { icon: <FaRegStar className="w-4 h-4 flex-shrink-0" />, text: 'Episódios da vida' }
            ]
        },
        instagram: {
            icon: <CiCamera className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />,
            title: 'Instagram',
            descriptionList: [
                { icon: <FaRegStar className="w-4 h-4 flex-shrink-0" />, text: 'Highlights personalizados' },
                { icon: <CiCamera className="w-4 h-4 flex-shrink-0" />, text: 'Stories dos momentos' },
                { icon: <CiHeart className="w-4 h-4 flex-shrink-0" />, text: 'Posts especiais' },
            ]
        },
    }