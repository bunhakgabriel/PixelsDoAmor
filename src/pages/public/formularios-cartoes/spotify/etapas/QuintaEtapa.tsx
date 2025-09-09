import MultipleImageUpload from "../../../../../components/MultipleImageUpload/MultipleImageUpload"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"

function QuintaEtapa() {
    return (
        <div>
            <MultipleImageUpload<ISpotifyAniversario> 
                maxImages={6}
                name="albumMemorias"
                label="Selecione até 6 imagens"
            />
        </div>
    )
}

export default QuintaEtapa
