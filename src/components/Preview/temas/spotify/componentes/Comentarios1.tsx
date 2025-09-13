import { useMutation } from "@tanstack/react-query";
import type { Comentarios, Comentario } from "../../../../../models/ISpotify";
import { useState } from "react";
import { FaRegCommentDots, FaTrashAlt } from "react-icons/fa";
import { SpotifyService } from "../../../../../services/spotify-service";
import { toast } from "react-toastify";

type ComentariosProps = {
  comentarios: Comentarios;
  idDocumento: string;
};

function Comentarios1({ comentarios, idDocumento }: ComentariosProps) {
  const [comentariosState, setComentariosState] = useState<Comentario[]>([
    ...comentarios.listaComentarios,
  ]);
  const [nome, setNome] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  const limparMensagem = () => {
    setNome("");
    setMensagem("");

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  const handleEnviarMensagem = (): void => {
    if (nome.trim() === "" || mensagem.trim() === "") {
      alert("Por favor, preencha seu nome e sua mensagem.");
      return;
    }
    const novoComentario: Comentario = {
      id: Date.now(), // ID único
      autor: nome,
      mensagem: mensagem,
    } as Comentario;
    setComentariosState([...comentariosState, novoComentario]);

    if (idDocumento) {
      mutation.mutate(novoComentario);
    } else {
      limparMensagem();
    }
  };

  const mutation = useMutation({
    mutationFn: (comentario: Comentario) =>
      SpotifyService.postComentario(idDocumento, comentario),
    onSuccess: () => {
        limparMensagem();
    },
    onError: (error) => {
      alert('Erro ao adicionar comentário, tente novamente!')
      console.log("Erro ao salvar: ", error);
      toast.error("Erro ao salvar cartão, tente novamente!");
    },
  });

  const handleDeletarComentario = (id: number): void => {
    if (window.confirm("Tem certeza que deseja excluir este comentário?")) {
      setComentariosState((prevComentarios) =>
        prevComentarios.filter((comentario) => comentario.id !== id)
      );
    }
  };

  if (!comentarios || !comentarios?.habilitado) return <></>;

  return (
    <div className="text-gray-100">
      {" "}
      {/* Added min-h-screen and bg-gray-900 here for overall background */}
      <div className="flex items-center space-x-2 mb-4">
        <FaRegCommentDots className="text-green-500 text-xl" />
        <h2 className="text-xl sm:text-2xl font-semibold">Comentarios</h2>
      </div>
      {/* Seção de Nova Mensagem */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-4">Deixe sua mensagem</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Seu nome"
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
          />
          <textarea
            placeholder="Escreva sua mensagem de parabéns..."
            rows={2}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            value={mensagem}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMensagem(e.target.value)
            }
          ></textarea>
          <button
            onClick={handleEnviarMensagem}
            className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 transition duration-200 text-white font-semibold flex items-center justify-center space-x-2"
          >
            Enviar Mensagem
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* Seção de Comentários Existentes */}
        <div className="space-y-2 ">
          {comentariosState.map((comentario) => (
            <div
              key={comentario.id}
              className="bg-gray-800 px-6 pt-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between mb-4">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    {comentario.autor[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">
                      {comentario.autor}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {comentario.mensagem}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 text-gray-400 text-sm mt-1">
                  <button
                    onClick={() => handleDeletarComentario(comentario.id)}
                    className="hover:text-red-500 pb-2"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comentarios1;
