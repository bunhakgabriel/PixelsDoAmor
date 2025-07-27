import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaReply, FaTrashAlt } from 'react-icons/fa'; // Import FaTrashAlt for delete icon
import { FaRegCommentDots } from 'react-icons/fa6';

// --- Definições de Tipos ---
interface Resposta {
    id: number;
    autor: string;
    mensagem: string;
}

interface Comentario {
    id: number;
    autor: string;
    mensagem: string;
    curtidas: number;
    curtido: boolean;
    respostas: Resposta[];
}

function Comentarios() {
    const [comentarios, setComentarios] = useState<Comentario[]>([
        {
            id: 1,
            autor: 'Ana Costa',
            mensagem: 'Parabéns pelo seu dia especial! Você é uma pessoa incrível e merece comemorar muito. Que venham mais 365 dias de música boa e momentos únicos! 🥳🎵',
            curtidas: 56,
            curtido: false,
            respostas: [],
        },
    ]);

    const [nome, setNome] = useState<string>('');
    const [mensagem, setMensagem] = useState<string>('');
    const [respondendoA, setRespondendoA] = useState<number | null>(null); // Armazena o ID do comentário que está sendo respondido

    const handleEnviarMensagem = (): void => {
        if (nome.trim() === '' || mensagem.trim() === '') {
            alert('Por favor, preencha seu nome e sua mensagem.');
            return;
        }

        if (respondendoA !== null) {
            setComentarios((prevComentarios) =>
                prevComentarios.map((comentario) =>
                    comentario.id === respondendoA
                        ? {
                            ...comentario,
                            respostas: [
                                {
                                    id: Date.now(), // ID único para a resposta
                                    autor: nome,
                                    mensagem: mensagem,
                                },
                                ...comentario.respostas, // Novas respostas vão para o topo da lista de respostas
                            ],
                        }
                        : comentario
                )
            );
            setRespondendoA(null); // Reseta o estado respondendoA
        } else {
            const novoComentario: Comentario = {
                id: Date.now(), // ID único
                autor: nome,
                mensagem: mensagem,
                curtidas: 0,
                curtido: false,
                respostas: [],
            };
            setComentarios([novoComentario, ...comentarios]); // Adiciona o novo comentário ao topo
        }

        setNome('');
        setMensagem('');
    };

    const handleCurtir = (id: number): void => {
        setComentarios((prevComentarios) =>
            prevComentarios.map((comentario) =>
                comentario.id === id
                    ? {
                        ...comentario,
                        curtidas: comentario.curtido ? comentario.curtidas - 1 : comentario.curtidas + 1,
                        curtido: !comentario.curtido,
                    }
                    : comentario
            )
        );
    };

    const handleResponderClick = (id: number): void => {
        const comentarioParaResponder = comentarios.find(comentario => comentario.id === id);
        if (comentarioParaResponder) {
            setRespondendoA(id);
            setNome(''); // Limpa os campos de nome e mensagem para a nova resposta
            setMensagem(`@${comentarioParaResponder.autor} `); // Preenche a mensagem com o nome do autor
        }
    };

    const handleDeletarComentario = (id: number): void => {
        if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
            setComentarios((prevComentarios) =>
                prevComentarios.filter((comentario) => comentario.id !== id)
            );
        }
    };

    return (
        <div className="text-gray-100"> {/* Added min-h-screen and bg-gray-900 here for overall background */}
            <div className="flex items-center space-x-2 mb-4">
                <FaRegCommentDots className="text-green-500 text-xl" />
                <h2 className="text-xl sm:text-2xl font-semibold">Comentarios</h2>
            </div>


            <div className='flex flex-col gap-4'>
                {/* Seção de Comentários Existentes */}
                <div className="space-y-6">
                    {comentarios.map((comentario) => (
                        <div key={comentario.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="flex items-start mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                                    UM
                                </div>
                                <div>
                                    <p className="font-semibold text-lg mb-1">{comentario.autor}</p>
                                    <p className="text-gray-300 leading-relaxed">{comentario.mensagem}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 text-gray-400 text-sm mt-4">
                                <button onClick={() => handleCurtir(comentario.id)} className="flex items-center space-x-1 hover:text-gray-100">
                                    {comentario.curtido ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                    <span>{comentario.curtidas}</span>
                                </button>
                                <button onClick={() => handleResponderClick(comentario.id)} className="flex items-center space-x-1 hover:text-gray-100">
                                    <FaReply />
                                    <span>Responder</span>
                                </button>
                                <button onClick={() => handleDeletarComentario(comentario.id)} className="flex items-center space-x-1 hover:text-red-500">
                                    <FaTrashAlt />
                                    <span>Excluir</span>
                                </button>
                            </div>

                            {/* Seção de Respostas */}
                            {comentario.respostas.length > 0 && (
                                <div className="ml-14 mt-4 space-y-4 border-l border-gray-700 pl-4">
                                    {comentario.respostas.map((resposta) => (
                                        <div key={resposta.id} className="bg-gray-700 p-4 rounded-lg">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
                                                    RP
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-base mb-1">{resposta.autor}</p>
                                                    <p className="text-gray-300 text-sm leading-relaxed">{resposta.mensagem}</p>
                                                </div>
                                            </div>
                                            {/* Respostas não podem ser curtidas nem respondidas, nem excluídas aqui */}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Seção de Nova Mensagem */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Deixe sua mensagem</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Seu nome"
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={nome}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                        />
                        <textarea
                            placeholder="Escreva sua mensagem de parabéns..."
                            rows={4}
                            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            value={mensagem}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMensagem(e.target.value)}
                        ></textarea>
                        <button
                            onClick={handleEnviarMensagem}
                            className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 transition duration-200 text-white font-semibold flex items-center justify-center space-x-2"
                        >
                            Enviar Mensagem
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comentarios;