import clsx from "clsx";
import { useEffect } from "react";
import { FaPause, FaYoutube } from "react-icons/fa";
import type { ISpotifyModel } from "../../../../../models/ISpotify";
import { useConfigStoreSpotify } from "../../../../../store/useConfigStoreSpotify";

type Props = {
  model: ISpotifyModel;
  variant: "preview" | "modal" | "page";
};

export default function ListaMusicas({ model, variant }: Props) {
  const { setplayingSong, indexSong, setIndexSong } = useConfigStoreSpotify()

  const tocar = (index: number) => {
    setplayingSong(true);
    setIndexSong(index)
  };

  const pausar = () => {
    setplayingSong(false)
    setIndexSong(undefined)
  };

  useEffect(() => {
    if(variant != 'preview' && indexSong == undefined){
      setIndexSong(0)
      tocar(0)
      setplayingSong(true)
    }              
  }, []);

  // const cores = [
  //   'from-green-400 to-green-600',
  //   'from-purple-400 to-purple-600',
  //   'from-yellow-400 to-yellow-600',
  //   'from-blue-400 to-blue-600',
  //   'from-red-400 to-red-600'
  // ]

  if (!model.musicas || model.musicas?.length == 0){
    return <></>;
  }

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 w-full rounded-xl bg-[#121212] p-4",
        {
          "lg:relative": variant != "preview",
        }
      )}
    >
      <h2 className="text-xl sm:text-2xl font-bold flex justify-between items-center gap-2">
        Playlist <span className="text-green-400">🎵</span>
      </h2>

      {/* Lista de músicas */}
      <div className="space-y-4">
        {" "}
        {/* padding-top para não esconder a lista */}
        {model.musicas.map((musica, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  indexSong === index ? pausar() : tocar(index)
                }
                className={`cursor-pointer min-w-10 h-10 rounded bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center`}
              >
                {indexSong === index ? (
                  <FaPause className="text-white text-lg" />
                ) : (
                  <FaYoutube className="text-white text-lg" />
                )}
              </button>
              <p className="font-semibold max-sm:text-[12px]">
                {musica.nome.length > 66
                  ? musica.nome.slice(0, 63) + "..."
                  : musica.nome}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Iframe do vídeo no topo */}
      <div
        className={clsx("", {
          "w-0 h-0 hidden": indexSong == undefined,
          "w-full md:h-64": variant == "preview" && indexSong !== undefined,
          "max-lg:w-full md:h-64":
            variant != "preview" && indexSong !== undefined,
        })}
      >
        {indexSong !== undefined && (
          <iframe
            className="w-full h-full"
            src={`${model.musicas[indexSong].url}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}