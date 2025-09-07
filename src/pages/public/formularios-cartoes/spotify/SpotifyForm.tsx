import clsx from "clsx"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { defaultValueSpotifyObject, type ISpotifyAniversario } from "../../../../models/ISpotify"
import { useEffect, useState } from "react"
import BackButton from "../../../../components/BackButton/BackButon"
import ButtonUi from "../../../../components/ButtonUi/ButtonUi"
import PrimeiraEtapa from "./etapas/PrimairaEtapa"
import SegundaEtapa from "./etapas/SegundaEtapa"
import TerceiraEtapa from "./etapas/TerceiraEtapa"
import SpotifyTema1 from "../../../../components/Preview/temas/spotify/SpotifyPreview1"
import QuartaEtapa from "./etapas/QuartaEtapa"
import QuintaEtapa from "./etapas/QuintaEtapa"
import SextaEtapa from "./etapas/SextaEtapa"
import Modal from "react-modal"
import { yupResolver } from '@hookform/resolvers/yup'
import { useConfigStoreSpotify } from "../../../../store/useConfigStoreSpotify"
import { SpotifySchema } from "./schema/SpotifySchema"

const etapas = ['', '', '', '', '', '']

function SpotifyForm() {
    const form = useForm<ISpotifyAniversario>({
        defaultValues: defaultValueSpotifyObject,
        resolver: yupResolver(SpotifySchema),
        mode: 'onChange'
    })
    const { control, trigger } = form

    const { previewCartao, setPreviewCartao } = useConfigStoreSpotify()
    const [etapaAtual, setEtapaAtual] = useState(0)
    const model = useWatch<ISpotifyAniversario>({ control }) as ISpotifyAniversario

    async function avancarEtapa() {
        const camposPorEtapa: (keyof ISpotifyAniversario)[][] = [
            ['titulo', 'nome'],
            ['fotoPrincipal', 'data'],
            ['musicas']
        ]

        const camposDaEtapaAtual = camposPorEtapa[etapaAtual]
        const valido = await trigger(camposDaEtapaAtual)

        if (valido) {
            setEtapaAtual(prev => prev + 1)
        }
    }

    function voltarEtapa() {
        setEtapaAtual(prev => prev - 1)
    }

    useEffect(() => {
        console.log(model)
    }, [model])

    return (
        <FormProvider {...form}>
            <div className="flex flex-col lg:flex-row p-6 gap-8 lg:gap-16 max-lg:items-center">

                <div className="flex flex-col w-full lg:w-3/5 max-sm:gap-4">
                    <div className="flex flex-col gap-4">
                        <BackButton
                            text="Voltar"
                            color="blue"
                            onClick={voltarEtapa}
                        />
                        <div className="flex gap-2">
                            {etapas.map((_, index) => (
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
                        {etapaAtual === 0 && <PrimeiraEtapa />}
                        {etapaAtual === 1 && <SegundaEtapa />}
                        {etapaAtual === 2 && <TerceiraEtapa />}
                        {etapaAtual === 3 && <QuartaEtapa />}
                        {etapaAtual === 4 && <QuintaEtapa />}
                        {etapaAtual === 5 && <SextaEtapa />}

                    </form>
                    <ButtonUi
                        className="w-[100%] h-[40px] sm:my-4"
                        text="Próximo"
                        onClick={avancarEtapa}
                        element="button"
                    />
                    <button onClick={() => setPreviewCartao(true)} className="cursor-pointer border">Preview</button>
                </div>

                {!previewCartao && (
                    <div className="w-full sm:w-[500px] lg:w-[2/5]">
                        <SpotifyTema1 variant="preview" model={model || defaultValueSpotifyObject} />
                    </div>
                )}

                <Modal isOpen={previewCartao} onRequestClose={() => setPreviewCartao(false)}>
                    <button
                        type="button"
                        onClick={() => setPreviewCartao(false)}
                        className="fixed cursor-pointer w-10 top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                        X
                    </button>
                    {/* <Preview /> */}
                    <SpotifyTema1 variant="modal" model={model || defaultValueSpotifyObject} />
                </Modal>

            </div>
        </FormProvider>
    )
}

export default SpotifyForm