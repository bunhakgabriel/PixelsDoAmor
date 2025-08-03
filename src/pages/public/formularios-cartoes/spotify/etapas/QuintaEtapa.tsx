import type { EtapaProps } from "../../../../../types/FormType"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"
import MultipleImageUpload from "../../../../../components/MultipleImageUpload/MultipleImageUpload"

function QuintaEtapa({ form }: EtapaProps<ISpotifyAniversario>) {
    return (
        <div>
            <MultipleImageUpload 
                form={form}
                name="albumMemorias"
                label="Selecione até 8 imagens"
            />
        </div>
    )
}

export default QuintaEtapa
