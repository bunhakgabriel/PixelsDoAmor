import MultipleImageUpload from "../../../../../components/MultipleImageUpload/MultipleImageUpload";
import type { ISpotifyModel } from "../../../../../models/ISpotify";

function QuintaEtapa() {
  return (
    <div>
      <MultipleImageUpload<ISpotifyModel>
        maxImages={6}
        name="albumMemorias"
        label="Selecione até 6 imagens"
      />
    </div>
  );
}

export default QuintaEtapa;
