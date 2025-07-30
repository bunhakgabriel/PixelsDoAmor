import clsx from "clsx"
import SpotifyTema from "../../../../components/Preview/temas/spotify/SpotifyPreview"
import { useForm, useWatch } from "react-hook-form"
import type { ISpotifyAniversario } from "../../../../models/ISpotify"
import { useEffect, useState } from "react"
import BackButton from "../../../../components/BackButton/BackButon"
import ButtonUi from "../../../../components/ButtonUi/ButtonUi"
import PrimeiraEtapa from "./etapas/PrimairaEtapa"
import SegundaEtapa from "./etapas/SegundaEtapa"
import { dadosPreviewSpotify } from "../../../../components/Preview/dados"
import YouTubeSearch from "../../../../components/YoutubeSearch/YoutubeSearch"


const etapas = ['', '', '', '', '', '']

function SpotifyForm() {
    const form = useForm<ISpotifyAniversario>()
    const { control } = form

    const [etapaAtual, setEtapaAtual] = useState(0)
    const model = useWatch({ control });

    async function avancarEtapa() {
        console.log('avançar etapa')
        setEtapaAtual(prev => prev + 1)
    }

    function voltarEtapa() {
        // if (etapaAtual == 0) return navigate('/login/motoboy')
        setEtapaAtual(prev => prev - 1)
    }

    const formValues = useWatch({ control })

    useEffect(() => {
        console.log(formValues)
    }, [formValues])

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
                                'bg-[#E5E7EB]': etapaAtual < index
                            })}></span>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <p className="text-[#4B5563] text-sm sm:text-lg">Etapa <span>{etapaAtual + 1}</span> de <span>{etapas.length}</span></p>
                    </div>
                </div>

                <form className="flex gap-6 flex-col">
                    {etapaAtual === 0 && <PrimeiraEtapa form={form} />}
                    {etapaAtual === 1 && <SegundaEtapa form={form} />}
                    {etapaAtual === 2 && (
                        <YouTubeSearch
                            form={form}
                            name="musicas"
                            label="Buscar vídeo no YouTube"
                            apiKey="AIzaSyAtkhDgYKvwpI32X58iWR1KpWO1qafgJYo"
                        />
                    )}

                </form>
                <ButtonUi
                    className="w-[100%] h-[40px] sm:my-4"
                    text="Próximo"
                    onClick={avancarEtapa}
                    element="button"
                />
            </div>

            <div className="w-full sm:w-[500px] lg:w-[2/5]">
                <SpotifyTema model={dadosPreviewSpotify} />
            </div>

        </div>
    )
}

export default SpotifyForm