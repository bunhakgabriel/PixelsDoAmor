import type { EtapaProps } from "../../../../../types/FormType"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"
import { style } from "../../../../../utils/classesCssGlobais"

function QuartaEtapa({ form }: EtapaProps<ISpotifyAniversario>) {
    const { register } = form

    return (
        <div>
            <div>
                <label htmlFor="titulo" className={`${style.classLabel}`}>
                    Mensagem especial
                </label>
                <textarea
                    id="titulo"
                    className={style.classInput}
                    placeholder="Ex: Que seu dia seja repleto de alegria e momentos inesquecíveis!"
                    {...register('mensagemEspecial.mensagem')}
                />
            </div>
            <div>
                <label htmlFor="titulo" className={`${style.classLabel}`}>
                    Autor
                </label>
                <input
                    id="titulo"
                    className={style.classInput}
                    placeholder="Ex: Gabriel"
                    {...register('mensagemEspecial.autor')}
                />
                <span className="text-[12px] sm:text-sm text-gray-600">Esse campo é opcional, se não quiser se identificar deixe em branco.</span>
            </div>
        </div>
    )
}

export default QuartaEtapa
