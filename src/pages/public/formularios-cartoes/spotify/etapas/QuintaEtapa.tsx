import MultipleImageUpload from "../../../../../components/MultipleImageUpload/MultipleImageUpload"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"

function QuintaEtapa() {
    return (
        <div>
            <MultipleImageUpload<ISpotifyAniversario> 
                name="albumMemorias"
                label="Selecione até 8 imagens"
            />
        </div>
    )
}

export default QuintaEtapa
