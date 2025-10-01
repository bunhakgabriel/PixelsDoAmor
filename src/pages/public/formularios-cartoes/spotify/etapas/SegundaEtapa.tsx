import { Controller, useFormContext } from "react-hook-form";
import ImageUploadField from "../../../../../components/ImageUploadField/ImageUploadField";
import MsgErrorInput from "../../../../../components/MsgErrorInput/MsgErrorInput";
import useMask from "../../../../../hooks/useMask";
import type { ISpotifyModel } from "../../../../../models/ISpotify";
import { style } from "../../../../../utils/classesCssGlobais";

function SegundaEtapa() {
  const {
    formState: { errors },
    control,
  } = useFormContext<ISpotifyModel>();
  const { mask } = useMask();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <ImageUploadField<ISpotifyModel>
          name="fotoPrincipal"
          label="Foto principal"
          width="w-full"
          height="h-[300px]"
        />
        {errors.fotoPrincipal && (
          <MsgErrorInput msg={errors?.fotoPrincipal?.imagem?.message || ""} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="data"
          defaultValue=""
          render={({ field }) => (
            <div>
              <label htmlFor="data" className={`${style.classLabel}`}>
                Data
              </label>
              <input
                type="text"
                id="data"
                className={`${style.classInput}`}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(e) => field.onChange(mask(e.target.value, "date"))}
                placeholder="Ex: 08/05/2002"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          )}
        />
        <div>
          {errors.data && <MsgErrorInput msg={errors.data.message || ""} />}
        </div>
        <span className="text-[12px] sm:text-sm text-gray-600">
          Campo opcional, aqui você pode colocar uma data de aniversário,
          aniversário de casamento, aniversário de namoro, ou uma data marcante
          para você ou para a pessoa presenteada.
        </span>
      </div>
    </div>
  );
}

export default SegundaEtapa;
