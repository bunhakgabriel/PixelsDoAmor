import type { ISpotifyAniversario } from "../../../../../models/ISpotify";
import type { EtapaProps } from "../../../../../types/FormType";
import { style } from "../../../../../utils/classesCssGlobais";

function SextaEtapa({ form }: EtapaProps<ISpotifyAniversario>) {
    const { register } = form

    return (
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
    )
}

export default SextaEtapa
