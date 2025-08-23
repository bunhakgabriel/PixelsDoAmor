import ImageUploadField from "../../../../../components/ImageUploadField/ImageUploadField";
import type { ISpotifyAniversario } from "../../../../../models/ISpotify";

function SegundaEtapa() {
  return (
    <div>
      <ImageUploadField<ISpotifyAniversario>
        name="fotoPrincipal"
        label="Foto principal"
        width="w-full"
        height="h-[300px]"
      />
    </div>
  )
}

export default SegundaEtapa