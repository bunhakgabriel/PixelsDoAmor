import { IoPlayOutline } from "react-icons/io5";
import PlaylistAniversario from "./componentes/PlaylistAniversario";
import AlbumMemorias from "./componentes/AlbumMemorias";
import Comentarios from "./componentes/Comentarios";
import type { ISpotifyAniversario } from "../../../../models/ISpotify";
import MensagemEspecial from "./componentes/MensagemEspecial";

type SpotifyTemaProps = {
    model: ISpotifyAniversario
}

function SpotifyTema({ model }: SpotifyTemaProps) {

    const backgroundsPage = [
        'bg-gradient-to-b from-[#2a2a2a] to-[#121212]',
        'bg-gradient-to-b from-[#3e3e3e] to-[#121212]',
        'bg-gradient-to-br from-[#1DB954] to-[#1F1B24]',
        'bg-gradient-to-b from-[#2D2D2D] to-[#7a00ff]',
        'bg-gradient-to-b from-[#1DB954] to-[#121212]'
    ]

    return (
        <div className={`${backgroundsPage[2]} text-white min-h-screen pb-[130px] p-4`}>
            <div className="flex flex-col gap-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{model.titulo || ''}</h1>
                        <p className="text-green-200">Playlist especial {model.nome ? `para ${model.nome}` : ''}</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <IoPlayOutline className="w-6 h-6 text-green-500" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-2/6">
                        <img className="w-full object-cover" src={model.fotoPrincipal.imagem instanceof File ? model.fotoPrincipal.previewImagem : model.fotoPrincipal.imagem} />
                    </div>

                    <PlaylistAniversario model={model} />
                </div>
                <MensagemEspecial model={model.mensagemEspecial} />
                <AlbumMemorias fotos={model.albumMemorias} />
                <Comentarios />
            </div>
            {/* <Player /> */}
        </div>
    )
}

export default SpotifyTema;