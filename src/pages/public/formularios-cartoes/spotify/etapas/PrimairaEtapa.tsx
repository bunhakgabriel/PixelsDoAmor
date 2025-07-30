import { HiOutlineSparkles } from "react-icons/hi2"
import ButtonUi from "../../../../../components/ButtonUi/ButtonUi"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"
import type { EtapaProps } from "../../../../../types/FormType"
import { style } from "../../../../../utils/classesCssGlobais"

function PrimeiraEtapa({ form }: EtapaProps<ISpotifyAniversario>) {
    const { register } = form

    return (
        <div className="flex gap-6 flex-col">
            <div>
                <label htmlFor="titulo" className={`${style.classLabel}`}>
                    Titulo do cartão *
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        id="titulo"
                        className={style.classInput}
                        placeholder="Ex: Para alguém especial!"
                        {...register('titulo')}
                    />
                    <ButtonUi
                        icon={<HiOutlineSparkles className="hidden sm:block w-5 h-5" />}
                        element="div"
                        text="Gerar IA"
                        className="max-sm:text-[12px] w-[110px] sm:w-[25%] sm:min-w-[125px]"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="titulo" className={`${style.classLabel}`}>
                    Nome da pessoa a presentear
                </label>
                <input
                    type="text"
                    id="titulo"
                    className={style.classInput}
                    placeholder="Ex: Bruna Silva"
                    {...register('nome')}
                />
                <span className="text-[12px] sm:text-sm text-gray-600">Esse campo é opcional, se o cartão não for pra presentear uma pessoa e tiver outro propósito pode deixa-lo em branco.</span>
            </div>
        </div>
    )
}

export default PrimeiraEtapa