import { FiGift } from "react-icons/fi";
import { MdOutlineHome } from "react-icons/md";
import { useState } from "react";
import clsx from "clsx";
import { useConfigStoreSpotify } from "../../store/useConfigStoreSpotify";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import InfoSuporte from "../InfoSuporte/InfoSuporte";

function Header() {
    const [currentPage] = useState<string>('home')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const previewCartaoSpotify = useConfigStoreSpotify(state => state.previewCartao)

    const navigate = useNavigate();
    const location = useLocation();

    const handleClickHome = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    }

    return (
        <>
            <header className={clsx('z-50 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg', {
                'fixed': !previewCartaoSpotify
            })}>
                <div className="container mx-auto px-4 py-4 max">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2" onClick={handleClickHome} style={{ cursor: 'pointer' }}>
                            <h1 className="text-lg sm:text-2xl font-bold">PixelsDoAmor</h1>
                        </div>
                        <nav className="flex space-x-2 sm:space-x-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className='text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 cursor-pointer flex items-center space-x-1 px-2 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base'
                            >
                                <IoChatbubbleEllipsesOutline className="w-5 h-5" />
                                <span className="inline">Suporte</span>
                            </button>
                            <button
                                onClick={handleClickHome}
                                className={clsx(
                                    'active:bg-white/20 cursor-pointer flex items-center space-x-1 px-2 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base',
                                    {
                                        'bg-white/20 text-white': currentPage === 'home',
                                        'text-white/80 hover:text-white hover:bg-white/10': currentPage !== 'home',
                                    }
                                )}
                            >
                                <MdOutlineHome className="w-5 h-5" />
                                <span className="inline">Início</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
            <InfoSuporte 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    )
}

export default Header