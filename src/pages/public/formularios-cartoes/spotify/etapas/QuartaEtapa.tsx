import MsgErrorInput from "../../../../../components/MsgErrorInput/MsgErrorInput"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"
import { style } from "../../../../../utils/classesCssGlobais"
import { useFormContext } from "react-hook-form"

function QuartaEtapa() {
    const { register, formState: { errors } } = useFormContext<ISpotifyAniversario>()
    const fieldError = errors.mensagemEspecial?.mensagem

    return (
        <div>
            <div>
                <label htmlFor="titulo" className={`${style.classLabel}`}>
                    Mensagem especial
                </label>
                <textarea
                    id="titulo"
                    className={`${fieldError ? style.error : ''} ${style.classInput}`}
                    placeholder="Ex: Que seu dia seja repleto de alegria e momentos inesquecíveis!"
                    {...register('mensagemEspecial.mensagem')}
                    maxLength={1000}
                />
                <div className="h-[22px]">
                    {fieldError && <MsgErrorInput msg={fieldError.message || ''} />}
                </div>
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
