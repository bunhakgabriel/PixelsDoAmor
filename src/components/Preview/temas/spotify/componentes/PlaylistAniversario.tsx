import { useEffect, useState } from 'react'
import { FaYoutube, FaPause } from 'react-icons/fa'
import type { ISpotifyAniversario } from '../../../../../models/ISpotify'
import { useConfigStoreSpotify } from '../../../../../store/useConfigStoreSpotify'

type Props = {
  model: ISpotifyAniversario
}

export default function ListaMusicas({ model }: Props) {
  const [musicaTocandoIndex, setMusicaTocandoIndex] = useState<number | null>(null)

  const playingSongMain = useConfigStoreSpotify(state => state.playingSongMain)
  const setPlayingSongMain = useConfigStoreSpotify(state => state.setPlayingSongMain)

  const tocar = (index: number) => {
    setPlayingSongMain(false)
    setMusicaTocandoIndex(index)
  }

  const pausar = () => {
    setMusicaTocandoIndex(null)
  }

  useEffect(() => {
    if(playingSongMain) pausar()
  }, [playingSongMain])

  // const cores = [
  //   'from-green-400 to-green-600',
  //   'from-purple-400 to-purple-600',
  //   'from-yellow-400 to-yellow-600',
  //   'from-blue-400 to-blue-600',
  //   'from-red-400 to-red-600'
  // ]

  if ((!model.musicas || model.musicas?.length == 0) && !model.musicaPrincipal.nome) return <></>

  return (
    <div className="flex flex-col gap-4 w-full rounded-xl bg-[#121212] p-4">
      <h2 className="text-xl sm:text-2xl font-bold flex justify-between items-center gap-2">
        Playlist <span className="text-green-400">🎵</span>
      </h2>

      {/* Lista de músicas */}
      <div className="space-y-4"> {/* padding-top para não esconder a lista */}
        {model.musicas.map((musica, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  musicaTocandoIndex === index ? pausar() : tocar(index)
                }
                className={`cursor-pointer min-w-10 h-10 rounded bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center`}
              >
                {musicaTocandoIndex === index ? (
                  <FaPause className="text-white text-lg" />
                ) : (
                  <FaYoutube className="text-white text-lg" />
                )}
              </button>
              <p className="font-semibold max-sm:text-[12px]">
                {musica.nome.length > 66 ? musica.nome.slice(0, 63) + '...' : musica.nome}
              </p>
            </div>
          </div>
        ))}
        {model.musicaPrincipal.nome && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setPlayingSongMain(!playingSongMain)
                }
                className={`cursor-pointer min-w-10 h-10 rounded bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center`}
              >
                {playingSongMain ? (
                  <FaPause className="text-white text-lg" />
                ) : (
                  <FaYoutube className="text-white text-lg" />
                )}
              </button>
              <p className="font-semibold max-sm:text-[12px]">
                {model.musicaPrincipal.nome.length > 66 ? model.musicaPrincipal.nome.slice(0, 63) + '...' : model.musicaPrincipal.nome}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Iframe do vídeo no topo */}
      <div className={`${musicaTocandoIndex !== null ? 'w-full  md:h-64' : 'w-0 h-0 hidden'}`}>
        {musicaTocandoIndex !== null && (
          <iframe
            className="w-full h-full"
            src={`${model.musicas[musicaTocandoIndex].url}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className={`${playingSongMain ? 'w-full  md:h-64' : 'w-0 h-0 hidden'}`}>
        {playingSongMain && (
          <iframe
            className="w-full h-full"
            src={`${model.musicaPrincipal.url}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  )
}
