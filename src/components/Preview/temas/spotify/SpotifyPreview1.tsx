import { IoPlayOutline } from "react-icons/io5";
import PlaylistAniversario from "./componentes/PlaylistAniversario";
import AlbumMemorias1 from "./componentes/AlbumMemorias1";
import Player from "./componentes/Player";
import type { ISpotifyAniversario } from "../../../../models/ISpotify";
import MensagemEspecial from "./componentes/MensagemEspecial";
import Comentarios1 from "./componentes/Comentarios1";
import { converterData } from "../../../../utils/converterData";

type SpotifyTemaProps = {
    model: ISpotifyAniversario
}

function SpotifyTema1({ model }: SpotifyTemaProps) {
    const backgroundsPage = [
        'bg-gradient-to-b from-[#2a2a2a] to-[#121212]',
        'bg-gradient-to-b from-[#3e3e3e] to-[#121212]',
        'bg-gradient-to-br from-[#1DB954] to-[#1F1B24]',
        'bg-gradient-to-b from-[#2D2D2D] to-[#7a00ff]',
        'bg-gradient-to-b from-[#1DB954] to-[#121212]'
    ]

    return (
        <div className={`${backgroundsPage[2]} relative rounded-2xl text-white max-h-[500px] overflow-y-scroll`}>
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{model.titulo || ''}</h1>
                        <p className="text-green-200">Playlist especial {model.nome ? `para ${model.nome}` : ''}</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <IoPlayOutline className="w-6 h-6 text-green-500" />
                    </div>
                </div>
                <div className="flex flex-col gap-4">

                    <div className="">
                        <img className="w-full object-cover" src={model.fotoPrincipal} />
                    </div>
                    <div>
                        <h1>
                            {model.data?.length == 10 && converterData(model.data) != '' && (
                                <div className="text-center">
                                    <p className="text-xl font-semibold mb-1 edu-nsw-act-cursive">{converterData(model.data)} de pura música!</p>
                                </div>
                            )}</h1>
                    </div>
                    <PlaylistAniversario model={model} />
                </div>
                <MensagemEspecial model={model.mensagemEspecial} />
                <AlbumMemorias1 fotos={model.albumMemorias} />
                <Comentarios1 comentarios={model.comentarios} />
            </div>
            <div className="sticky -bottom-4 z-10">
                <Player musicaPrincipal={model.musicaPrincipal} data={model.data} />
            </div>
        </div>
    )
}

export default SpotifyTema1;