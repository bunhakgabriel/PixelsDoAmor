import { useFormContext } from "react-hook-form";
import ImageUploadField from "../../../../../components/ImageUploadField/ImageUploadField";
import type { ISpotifyAniversario } from "../../../../../models/ISpotify";
import { style } from "../../../../../utils/classesCssGlobais";

function SegundaEtapa() {
  const { register } = useFormContext<ISpotifyAniversario>()

  return (
    <div className="flex flex-col gap-8">
      <ImageUploadField<ISpotifyAniversario>
        name="fotoPrincipal"
        label="Foto principal"
        width="w-full"
        height="h-[300px]"
      />
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="data" className={`${style.classLabel}`}>
            Data
          </label>
          <input
            type="text"
            id="data"
            className={`${style.classInput}`}
            {...register('data')}
            placeholder="Ex: 08/05/2002"
          />
          <span className="text-[12px] sm:text-sm text-gray-600">
            Aqui você pode colocar uma data de aniversário, aniversário de casamento, aniversário de namoro, ou uma data marcante para você ou para a pessoa presenteada.
          </span>
        </div>
      </div>
    </div>
  )
}

export default SegundaEtapa