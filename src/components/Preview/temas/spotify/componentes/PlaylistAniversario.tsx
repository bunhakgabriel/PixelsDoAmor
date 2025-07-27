import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

type PlaylistAniversarioProps = {
  musicas: {
    nome: string;
    duracao: string;
  }[];
};

function PlaylistAniversario({ musicas }: PlaylistAniversarioProps) {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [musicaTocandoIndex, setMusicaTocandoIndex] = useState<number | null>(null);

  const tocar = (index: number) => {
    // Se há uma música tocando e não é a mesma, pausamos e resetamos ela
    if (musicaTocandoIndex !== null && musicaTocandoIndex !== index) {
      const atual = audioRefs.current[musicaTocandoIndex];
      if (atual) {
        atual.pause();
        atual.currentTime = 0;
      }
    }

    const audio = audioRefs.current[index];
    if (audio) {
      audio.play();
      setMusicaTocandoIndex(index);
    }
  };

  const pausar = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.pause();
      setMusicaTocandoIndex(null);
    }
  };

  const cores = [
    "from-green-400 to-green-600",
    "from-pink-400 to-purple-600",
    "from-yellow-400 to-orange-500",
    "from-cyan-400 to-blue-500",
    "from-pink-400 to-red-500",
  ];

  return (
    <div className="sm:w-4/6 rounded-xl bg-[#121212] text-white font-sans p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex justify-between items-center gap-2">
        Playlist de Aniversário <span className="text-green-400">🎵</span>
      </h2>

      <div className="space-y-4 w-full">
        {musicas.map((musica, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <audio
                ref={(el) => {
                  if (el) audioRefs.current[index] = el;
                }}
                src={`/musicas/${musica.nome}.mp3`}
              />
              <button
                onClick={() =>
                  musicaTocandoIndex === index ? pausar(index) : tocar(index)
                }
                className={`cursor-pointer min-w-10 h-10 rounded bg-gradient-to-br ${
                  cores[index % cores.length]
                } flex items-center justify-center`}
              >
                {musicaTocandoIndex === index ? (
                  <FaPause className="text-white text-xs" />
                ) : (
                  <FaPlay className="text-white text-xs" />
                )}
              </button>
              <div>
                <p className="font-semibold">{musica.nome}</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">{musica.duracao}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistAniversario;
