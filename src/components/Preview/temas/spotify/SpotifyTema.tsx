import clsx from "clsx";
import type { ISpotifyModel } from "../../../../models/ISpotify";
import { converterData } from "../../../../utils/converterData";
import AlbumMemorias1 from "./componentes/AlbumMemorias1";
import MensagemEspecial from "./componentes/MensagemEspecial";
import Player from "./componentes/Player";
import PlaylistAniversario from "./componentes/PlaylistAniversario";
import SnowfallEfeito from "./componentes/SnowfallEfeito";

type SpotifyTemaProps = {
  model: ISpotifyModel;
  variant: "preview" | "modal" | "page";
};

function DataEspecial({
  model,
  className,
}: {
  model: ISpotifyModel;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      {model.data?.length == 10 && converterData(model.data) != "" && (
        <p className="text-xl font-semibold mb-1 edu-nsw-act-cursive text-center">
          {converterData(model.data)} de pura música!
        </p>
      )}
    </div>
  );
}

function SpotifyTema({ model, variant }: SpotifyTemaProps) {
  const backgroundsPage = [
    "bg-gradient-to-b from-[#2a2a2a] to-[#121212]",
    "bg-gradient-to-b from-[#3e3e3e] to-[#121212]",
    "bg-gradient-to-br from-[#1DB954] to-[#1F1B24]",
    "bg-gradient-to-b from-[#2D2D2D] to-[#7a00ff]",
    "bg-gradient-to-b from-[#1DB954] to-[#121212]",
  ];

  return (
    <>
      {variant != "preview" && <SnowfallEfeito tipo={model.animacao} />}
      <div className={`${backgroundsPage[0]} flex justify-center`}>
        <div
          className={clsx(`${backgroundsPage[4]} w-full text-white`, {
            "relative rounded-2xl max-h-[500px] overflow-y-scroll":
              variant == "preview",
            "min-h-screen max-w-[450px]": variant == "modal",
            "mb-[100px]  max-w-[450px]": variant == "page",
          })}
        >
          <div className="flex flex-col p-4">
            <div className="py-4">
              <h1 className="text-2xl font-bold">{model.titulo || ""}</h1>
              <p className="text-green-200">
                Playlist especial {model.nome ? `para ${model.nome}` : ""}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div>
                  <img
                    className="w-full max-h-[350px] object-cover rounded-2xl"
                    src={
                      model.fotoPrincipal.imagem instanceof File
                        ? model.fotoPrincipal.previewImagem
                        : model.fotoPrincipal.imagem
                    }
                  />
                </div>
                <DataEspecial model={model} />
              </div>
              <MensagemEspecial model={model.mensagemEspecial} />
            </div>
            <div className="py-8">
              <AlbumMemorias1 variant={variant} fotos={model.albumMemorias} />
            </div>
            <div className="py-4">
              <PlaylistAniversario variant={variant} model={model} />
            </div>
            {/* Funcionalidade de comentarios nao vai ser usada no momento */}
            {/* <Comentarios1
            comentarios={model.comentarios}
            idDocumento={model.id || ""}
          /> */}
          </div>
          <div
            className={clsx("", {
              "sticky -bottom-4 z-10": variant != "page",
              "fixed w-full -bottom-5 z-10": variant == "page",
              "max-w-[450px]": variant != "preview",
            })}
          >
            <Player musicaPrincipal={model.musicaPrincipal} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SpotifyTema;
