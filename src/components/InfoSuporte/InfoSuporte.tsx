import type { Dispatch, SetStateAction } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Modal from "react-modal";

function InfoSuporte({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: Dispatch<SetStateAction<boolean>>; }) {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="max-w-md w-[90%] mx-auto mt-24 bg-white rounded-2xl shadow-2xl p-6 relative"
            overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
        >
            <div className="p-8">
                <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-4">
                    Suporte
                </h2>
                <p className="text-gray-600 text-center mb-6">
                    Precisa de ajuda? Entre em contato pelos canais abaixo:
                </p>

                <div className="space-y-4">
                    <a
                        href="mailto:bunhakgabriel@gmail.com?subject=Suporte&body=Olá,%20preciso%20de%20ajuda%20com..."
                        className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                    >
                        <FaEnvelope className="text-purple-600 w-6 h-6" />
                        <span className="text-gray-800">bunhakgabriel@gmail.com</span>
                    </a>
                    <a
                        href="https://wa.me/5541996729097"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
                    >
                        <FaWhatsapp className="text-green-600 w-6 h-6" />
                        <span className="text-gray-800">+55 41 99672-9097</span>
                    </a>
                </div>

                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition"
                >
                    Fechar
                </button>
            </div>
        </Modal>
    )
}

export default InfoSuporte