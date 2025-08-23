import { useFormContext } from "react-hook-form";
import YouTubeSearch from "../../../../../components/YoutubeSearch/YoutubeSearch";
import type { ISpotifyAniversario } from "../../../../../models/ISpotify";
import { style } from "../../../../../utils/classesCssGlobais";
import clsx from "clsx";

type typeOpcoes = {
    id: 'completo' | 'anos' | 'dias' | 'meses'
    label: string
}

const opcoes: typeOpcoes[] = [
    { id: "completo", label: "Formato completo" },
    { id: "anos", label: "Formato em anos" },
    { id: "dias", label: "Formato em dias" },
    { id: "meses", label: "Formato em meses" },
]

function SextaEtapa() {
    const { register, getValues, setValue, watch } = useFormContext<ISpotifyAniversario>()

    const musica = getValues('musicaPrincipal')
    const valorData = watch('data.valor')

    const onChangeData = (opcao: typeOpcoes) => {
        setValue('data.formato', opcao.id)
        const [dia, ano, mes] = valorData.split('/').map(Number)
        const objetoDate = new Date(ano, mes - 1, dia)
        const hoje = new Date()

        let anos = hoje.getFullYear() - objetoDate.getFullYear()
        let meses = hoje.getMonth() - objetoDate.getMonth()
        let dias = hoje.getDate() - objetoDate.getDate()

        // Ajustar meses e anos se o mês/dia atual ainda não passou na data
        if (dias < 0) {
            meses -= 1
            // pega número de dias do mês anterior
            const mesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate()
            dias += mesAnterior
        }
        if (meses < 0) {
            anos -= 1
            meses += 12
        }


        switch (opcao.id) {
            case 'completo':
                setValue('data.texto', `Há ${anos} anos, ${meses} meses e ${dias} dias`)
                break
            case 'anos':
                setValue('data.texto', `Há ${anos} anos, ${meses} meses e ${dias} dias`)
                break
            case 'meses':
                setValue('data.texto', `Há ${anos} anos, ${meses} meses e ${dias} dias`)
                break
            default:
                return
        }

    }

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
                    Ao habilitar você permite que seus amigos e outros visitantes da web page deixem suas mensagens,
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
            <div className="flex flex-col gap-2">
                <div>
                    <label htmlFor="data" className={`${style.classLabel}`}>
                        Data
                    </label>
                    <input
                        type="text"
                        id="data"
                        className={`${style.classInput}`}
                        {...register('data.valor')}
                        placeholder="Ex: 08/05/2002"
                    />
                    <span className="text-[12px] sm:text-sm text-gray-600">
                        Aqui você pode colocar uma data de aniversário, aniversário de casamento, aniversário de namoro, ou uma data marcante para você ou para a pessoa presenteada, você pode exibir ela em anos, dias ou meses.
                    </span>
                </div>
                <div className="flex gap-4">
                    {opcoes.map(opcao => (
                        <div key={opcao.id} className="flex gap-2 items-center">
                            <input
                                type="radio"
                                id={opcao.id}
                                value={opcao.id}
                                className={clsx(
                                    "w-5 h-5",
                                    {
                                        "bg-gray-200 cursor-not-allowed": !valorData,
                                        "cursor-pointer": valorData,
                                    }
                                )}
                                {...register('data.formato')}
                                onChange={() => onChangeData(opcao)}
                                disabled={!valorData}
                            />
                            <label htmlFor={opcao.id} className="cursor-pointer">
                                {opcao.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SextaEtapa
