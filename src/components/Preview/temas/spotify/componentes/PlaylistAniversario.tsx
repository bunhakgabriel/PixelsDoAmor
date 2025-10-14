import clsx from "clsx";
import { FaPause, FaYoutube } from "react-icons/fa";
import type { ISpotifyModel } from "../../../../../models/ISpotify";
import { useConfigStoreSpotify } from "../../../../../store/useConfigStoreSpotify";
import { useEffect, useRef, useState } from "react";

type Props = {
  model: ISpotifyModel;
  variant: "preview" | "modal" | "page";
};

export default function ListaMusicas({ model, variant }: Props) {
  const { setplayingSong, indexSong, setIndexSong } = useConfigStoreSpotify();

  const [indexTeste, setIndexTeste] = useState<number | undefined>(undefined);
  const [apiReady, setApiReady] = useState(false);

  const iframeRef1 = useRef<HTMLIFrameElement>(null);
  const iframeRef2 = useRef<HTMLIFrameElement>(null);
  const iframeRef3 = useRef<HTMLIFrameElement>(null);
  const iframeRef4 = useRef<HTMLIFrameElement>(null);

  const playerRef1 = useRef<any>(null);
  const playerRef2 = useRef<any>(null);
  const playerRef3 = useRef<any>(null);
  const playerRef4 = useRef<any>(null);

  const tocar = (index: number) => {
    if (!apiReady) {
      setIndexSong(undefined);
      setplayingSong(false);
      return;
    }
    if (indexSong !== undefined && indexSong !== index) {
      handlePause(indexSong);
    }

    setplayingSong(true);
    setIndexTeste(index);
    setIndexSong(index);
    handlePlay(index);
  };

  const pausar = (index: number) => {
    if (!apiReady) return;
    setplayingSong(false);
    setIndexTeste(undefined);
    setIndexSong(undefined);
    handlePause(index);
  };

  const handlePlay = (index: number) => {
    if (index == 0) {
      if (playerRef1.current && playerRef1.current.playVideo && iframeRef1.current) {
        iframeRef1.current.style.width = "300px";
        iframeRef1.current.style.height = "300px";
        playerRef1.current.playVideo();
      }
    } else if (index == 1) {
      if (playerRef2.current && playerRef2.current.playVideo && iframeRef2.current) {
        iframeRef2.current.style.width = "300px";
        iframeRef2.current.style.height = "300px";
        playerRef2.current.playVideo();
      }
    } else if (index == 2) {
      if (playerRef3.current && playerRef3.current.playVideo && iframeRef3.current) {
        iframeRef3.current.style.width = "300px";
        iframeRef3.current.style.height = "300px";
        playerRef3.current.playVideo();
      }
    } else if (index == 3) {
      if (playerRef4.current && playerRef4.current.playVideo && iframeRef4.current) {
        iframeRef4.current.style.width = "300px";
        iframeRef4.current.style.height = "300px";
        playerRef4.current.playVideo();
      }
    }
  };

  const handlePause = (index: number) => {
    if (index == 0) {
      if (playerRef1.current && playerRef1.current.pauseVideo && iframeRef1.current) {
        playerRef1.current.pauseVideo();
        playerRef1.current.seekTo(0);
        iframeRef1.current.style.width = "0";
        iframeRef1.current.style.height = "0";
      }
    } else if (index == 1) {
      if (playerRef2.current && playerRef2.current.pauseVideo && iframeRef2.current) {
        playerRef2.current.pauseVideo();
        playerRef2.current.seekTo(0);
        iframeRef2.current.style.width = "0";
        iframeRef2.current.style.height = "0";
      }
    } else if (index == 2) {
      if (playerRef3.current && playerRef3.current.pauseVideo && iframeRef3.current) {
        playerRef3.current.pauseVideo();
        playerRef3.current.seekTo(0);
        iframeRef3.current.style.width = "0";
        iframeRef3.current.style.height = "0";
      }
    } else if (index == 3) {
      if (playerRef4.current && playerRef4.current.pauseVideo && iframeRef4.current) {
        playerRef4.current.pauseVideo();
        playerRef4.current.seekTo(0);
        iframeRef4.current.style.width = "0";
        iframeRef4.current.style.height = "0";
      }
    }
  };

  useEffect(() => {
    const createPlayers = (YT: any) => {
      let playersReady = 0;
      const totalPlayers = [
        iframeRef1.current,
        iframeRef2.current,
        iframeRef3.current,
        iframeRef4.current,
      ].filter(Boolean).length;

      const handlePlayerReady = () => {
        playersReady++;
        if (playersReady === totalPlayers) {
          console.log("🎬 Todos os players estão prontos!");
          setApiReady(true);
        }
      };

      if (iframeRef1.current && !playerRef1.current)
        playerRef1.current = new YT.Player(iframeRef1.current, {
          events: { onReady: handlePlayerReady },
        });

      if (iframeRef2.current && !playerRef2.current)
        playerRef2.current = new YT.Player(iframeRef2.current, {
          events: { onReady: handlePlayerReady },
        });

      if (iframeRef3.current && !playerRef3.current)
        playerRef3.current = new YT.Player(iframeRef3.current, {
          events: { onReady: handlePlayerReady },
        });

      if (iframeRef4.current && !playerRef4.current)
        playerRef4.current = new YT.Player(iframeRef4.current, {
          events: { onReady: handlePlayerReady },
        });
    };

    // ✅ Verifica se a API ainda não foi carregada
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        const YT = (window as any).YT;
        createPlayers(YT);
      };
    } else {
      // ✅ API já carregada
      const YT = (window as any).YT;
      createPlayers(YT);
    }
  }, [model.musicas]);


  useEffect(() => {
    if ((indexTeste != undefined && indexSong != undefined) && (indexTeste !== indexSong)) {
      pausar(indexTeste);
      tocar(indexSong);
    } else if (indexTeste != undefined && indexSong == undefined) {
      pausar(indexTeste);
    } else if (indexTeste == undefined && indexSong != undefined) {
      tocar(indexSong);
    }
  }, [indexSong]);

  if (!model.musicas || model.musicas?.length == 0) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 w-full rounded-xl bg-[#121212] p-4",
        { "lg:relative": variant != "preview" }
      )}
    >
      <h2 className="text-xl sm:text-2xl font-bold flex justify-between items-center gap-2">
        Playlist <span className="text-green-400">🎵</span>
      </h2>

      <div className="space-y-4">
        {model.musicas.map((musica, index) => (
          <div
            key={index}
            onClick={() => (indexSong === index ? pausar(index) : tocar(index))}
            className={`cursor-pointer flex items-center justify-between ${!apiReady ? "opacity-50 pointer-events-none" : ""
              }`}
          >
            <div className="flex items-center gap-4">
              <button
                disabled={!apiReady}
                className="min-w-10 h-10 rounded bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center"
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

      {/* iframes */}
      {model.musicas[0] && (
        <iframe
          ref={iframeRef1}
          width="0"
          height="0"
          src={`${model.musicas[0].url}?enablejsapi=1&playsinline=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      {model.musicas[1] && (
        <iframe
          ref={iframeRef2}
          width="0"
          height="0"
          src={`${model.musicas[1].url}?enablejsapi=1&playsinline=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      {model.musicas[2] && (
        <iframe
          ref={iframeRef3}
          width="0"
          height="0"
          src={`${model.musicas[2].url}?enablejsapi=1&playsinline=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      {model.musicas[3] && (
        <iframe
          ref={iframeRef4}
          width="0"
          height="0"
          src={`${model.musicas[3].url}?enablejsapi=1&playsinline=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
