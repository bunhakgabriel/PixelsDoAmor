import type { EtapaProps } from "../../../../../types/FormType";
import type { ISpotifyAniversario } from "../../../../../models/ISpotify";
import ImageUploadField from "../../../../../components/ImageUploadField/ImageUploadField";

function SegundaEtapa({ form }: EtapaProps<ISpotifyAniversario>) {
  return (
    <div>
      <ImageUploadField
        name="fotoPrincipal"
        label="Foto principal"
        form={form}
        width="w-full"
        height="h-[300px]"
      />
    </div>
  )
}

export default SegundaEtapa