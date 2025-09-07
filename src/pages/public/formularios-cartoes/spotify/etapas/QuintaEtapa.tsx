import MultipleImageUpload from "../../../../../components/MultipleImageUpload/MultipleImageUpload"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"

function QuintaEtapa() {
    return (
        <div>
            <MultipleImageUpload<ISpotifyAniversario> 
                maxImages={8}
                name="albumMemorias"
                label="Selecione até 8 imagens"
            />
        </div>
    )
}

export default QuintaEtapa
