import { useFormContext } from "react-hook-form";
import YouTubeSearch from "../../../../../components/YoutubeSearch/YoutubeSearch";
import type { ISpotifyAniversario } from "../../../../../models/ISpotify";
import { style } from "../../../../../utils/classesCssGlobais";

function SextaEtapa() {
    const { register, getValues } = useFormContext<ISpotifyAniversario>()

    const musica = getValues('musicaPrincipal')

    return (
        <div className="flex flex-col gap-8">
            <div>
                <div className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        id="comentarios"
                        className="w-5 h-5 cursor-pointer"
                        placeholder="Ex: Bruna Silva"
                        {...register('comentarios.habilitado')}
                    />
                    <label htmlFor="comentarios" className={`${style.classLabel} cursor-pointer`}>
                        Habilitar comentários
                    </label>
                </div>
                <span className="text-[12px] sm:text-sm text-gray-600">
                    Campo opcional, ao habilitar você permite que seus amigos e outros visitantes da web page deixem suas mensagens,
                    comentarios e interajam com a página, você como administrador pode a qualquer momento desabilitar
                    essa opção e excluir comentários indesejados.
                </span>

            </div>
            <div>
                <YouTubeSearch<ISpotifyAniversario>
                    type="item"
                    name="musicaPrincipal"
                    label="Trilha sonora princial"
                    apiKey={'AIzaSyAtkhDgYKvwpI32X58iWR1KpWO1qafgJYo'}
                />
                {!musica.nome && (
                    <span className="text-[12px] sm:text-sm text-gray-600">
                        Essa vai ser a trilha sonora principal da web page, ela é opcional, escolha uma para testar.
                    </span>
                )}
            </div>
        </div>
    )
}

export default SextaEtapa
