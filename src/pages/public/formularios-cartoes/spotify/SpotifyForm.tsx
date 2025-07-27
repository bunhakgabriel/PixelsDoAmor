import { useState } from 'react';
import { CiCalendar, CiImageOn, CiMusicNote1 } from 'react-icons/ci';
import { FiSave } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';
import { LuMessageCircle } from 'react-icons/lu';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import type { ISpotifyAniversario } from '../../../../models/ISpotify';
import SpotifyTema from '../../../../components/Preview/temas/spotify/SpotifyPreview';
import { dadosPreviewSpotify } from '../../../../components/Preview/dados';

interface BirthdayCard {
    id: string;
    name: string;
    birthDate: string;
    age: number;
    theme: 'spotify' | 'netflix' | 'instagram';
    plan: 'basic' | 'plus';
    messages: string[];
    photos: string[];
    music?: string[];
    customData?: any;
    createdAt?: string;
}

const samplePhotos = [
    ''
];

function SpotifyForm() {
    const { register, handleSubmit } = useForm<ISpotifyAniversario>()

    const [newMessage, setNewMessage] = useState('');
    const [newMusic, setNewMusic] = useState('');

    const [cardData, setCardData] = useState<Partial<BirthdayCard>>({
        plan: 'basic',
        theme: 'spotify',
        messages: [],
        photos: []
    });

    return (
        <div className=''>
            <form className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Personalize seu cartão
                    </h2>
                    <div className="flex space-x-2 w-full sm:w-auto">
                        <button
                            className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base flex-1 sm:flex-none justify-center"
                        >
                            <MdOutlineRemoveRedEye className="w-4 h-4" />
                            <span>Visualizar</span>
                        </button>
                        <button
                            className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base flex-1 sm:flex-none justify-center"
                        >
                            <FiSave className="w-4 h-4" />
                            <span>Salvar</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    {/* Informações Básicas */}
                    <div className="space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center space-x-2">
                            <CiCalendar className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Informações do Aniversariante</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome
                                </label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                                    type="text"
                                    placeholder="Nome do aniversariante"
                                    {...register('nome')}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data de Nascimento
                                </label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mensagens */}
                    <div className="space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center space-x-2">
                            <LuMessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Mensagens</span>
                        </h3>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                                placeholder="Escreva uma mensagem especial..."
                            />
                            <button
                                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <IoAdd className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {cardData.messages?.map((message, index) => (
                                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                    <span className="flex-1 text-gray-700 text-sm sm:text-base break-words">{message}</span>
                                    <button
                                        className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                                    >
                                        <MdDeleteOutline className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fotos */}
                    <div className="space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center space-x-2">
                            <CiImageOn className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Fotos</span>
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            {samplePhotos.map((photo, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={photo}
                                        alt={`Foto ${index + 1}`}
                                        className="w-full h-20 sm:h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                                    />
                                    <button
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg"
                                    >
                                        <IoAdd className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            {cardData.photos?.map((photo, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={photo}
                                        alt={`Selecionada ${index + 1}`}
                                        className="w-full h-20 sm:h-24 object-cover rounded-lg border-2 border-purple-500"
                                    />
                                    <button
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                        <MdOutlineRemoveRedEye className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Músicas (apenas para plano Plus) */}
                    {cardData.plan === 'plus' && (
                        <div className="space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center space-x-2">
                                <CiMusicNote1 className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Trilha Sonora</span>
                            </h3>

                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                <input
                                    type="text"
                                    value={newMusic}
                                    onChange={(e) => setNewMusic(e.target.value)}
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                                    placeholder="Nome da música - Artista"
                                />
                                <button
                                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <IoAdd className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {cardData.music?.map((song, index) => (
                                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                        <CiMusicNote1 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                        <span className="flex-1 text-gray-700 text-sm sm:text-base break-words">{song}</span>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                                        >
                                            <MdOutlineRemoveRedEye className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </form>
            <div className=''> 
                <SpotifyTema model={dadosPreviewSpotify} />
            </div>
        </div>
    );
};

export default SpotifyForm;