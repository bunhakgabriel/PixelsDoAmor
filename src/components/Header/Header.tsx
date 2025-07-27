import { FiGift } from "react-icons/fi";
import { MdOutlineHome } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import clsx from "clsx";

function Header() {
    const [currentPage, setCurrentPage] = useState<string>('home')

    return (
        <header className="z-50 fixed w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <FiGift className="w-6 h-6 sm:w-8 sm:h-8" />
                        <h1 className="text-lg sm:text-2xl font-bold">MoMents</h1>
                    </div>
                    <nav className="flex space-x-2 sm:space-x-4">
                        <button
                            // onClick={() => onNavigate('home')}
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
                        <button
                            // onClick={() => onNavigate('create')}
                            className={clsx(
                                'active:bg-white/20 cursor-pointer flex items-center space-x-1 px-2 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base',
                                {
                                    'bg-white/20 text-white': currentPage === 'create',
                                    'text-white/80 hover:text-white hover:bg-white/10': currentPage !== 'create',
                                }
                            )}
                        >
                            <IoAdd className="w-5 h-5" />
                            <span className="inline">Criar</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header