import clsx from "clsx"
import SpotifyTema from "../../../../components/Preview/temas/spotify/SpotifyPreview"
import { HiOutlineSparkles } from "react-icons/hi2"
import { useForm, useWatch } from "react-hook-form"
import type { ISpotifyAniversario } from "../../../../models/ISpotify"
import { useState } from "react"
import BackButton from "../../../../components/BackButton/BackButon"
import ButtonUi from "../../../../components/ButtonUi/ButtonUi"

const classLabel = 'block text-sm sm:text-xl font-medium text-gray-700 mb-1'
const classInput = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
const etapas = ['','','','','','']

function SpotifyForm() {
    const { register, control } = useForm<ISpotifyAniversario>()

    const [etapaAtual, setEtapaAtual] = useState(0)
    const model = useWatch({ control });

    async function avancarEtapa() {
        setEtapaAtual(prev => prev + 1)
    }

    function voltarEtapa() {
        // if (etapaAtual == 0) return navigate('/login/motoboy')
        setEtapaAtual(prev => prev - 1)
    }

    return (
        <div className="flex flex-col lg:flex-row p-6 gap-8 lg:gap-16 max-lg:items-center">

            <div className="flex flex-col w-full lg:w-3/5 max-sm:gap-4">
                <div className="flex flex-col gap-4">
                    <BackButton
                        text="Voltar"
                        color="blue"
                        onClick={voltarEtapa}
                    />
                    <div className="flex gap-2">
                        {etapas.map((etapa, index) => (
                            <span key={index} className={clsx('rounded-2xl w-full h-[10px]', {
                                'bg-gradient-to-r from-purple-600 to-pink-600': etapaAtual >= index,
                                'bg-[#E5E7EB]': etapaAtual < index,
                                'hidden': index == 4
                            })}></span>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <p className="text-[#4B5563] text-sm sm:text-lg">Etapa <span>{etapaAtual + 1}</span> de <span>{etapas.length}</span></p>
                    </div>
                </div>

                <form className="flex gap-6 flex-col">
                    <div>
                        <label htmlFor="titulo" className={`${classLabel}`}>
                            Titulo do cartão *
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="titulo"
                                className={classInput}
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
                        <label htmlFor="titulo" className={`${classLabel}`}>
                            Nome da pessoa a presentear
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            className={classInput}
                            placeholder="Ex: Bruna Silva"
                            {...register('nome')}
                        />
                        <span className="text-[12px] sm:text-sm text-gray-600">Esse campo é opcional, se o cartão não for pra presentear uma pessoa e tiver outro propósito pode deixa-lo em branco.</span>
                    </div>
                </form>
                <ButtonUi
                    className="w-[100%] h-[40px] sm:my-4"
                    text="Próximo"
                    onClick={avancarEtapa}
                    element="button"
                 />
            </div>
            
            <div className="w-full sm:w-[500px] lg:w-[2/5]">
                <SpotifyTema model={model} />
            </div>

        </div>
    )
}

export default SpotifyForm