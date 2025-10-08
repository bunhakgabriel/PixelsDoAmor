import { useFormContext } from "react-hook-form";
import MsgErrorInput from "../../../../../components/MsgErrorInput/MsgErrorInput";
import type { ISpotifyModel } from "../../../../../models/ISpotify";
import { style } from "../../../../../utils/classesCssGlobais";
import { gerarMensagemEspecial } from "../../../../../utils/gerarMensagemEspecial";
import ButtonUi from "../../../../../components/ButtonUi/ButtonUi";
import { HiOutlineSparkles } from "react-icons/hi2";

function TerceiraEtapa() {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
    getValues
  } = useFormContext<ISpotifyModel>();
  const fieldError = errors.mensagemEspecial?.mensagem;

  async function gerarMensagemComIA() {
    const mensagem = gerarMensagemEspecial()
    setValue("mensagemEspecial", {
      mensagem: mensagem,
      autor: getValues('mensagemEspecial.autor')
    })
    await trigger("mensagemEspecial")
  }

  return (
    <div>
      <div>
        <label htmlFor="titulo" className={`${style.classLabel}`}>
          Mensagem especial
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <textarea
            id="titulo"
            className={`${fieldError ? style.error : ""} ${style.classInput}`}
            placeholder="Ex: Que seu dia seja repleto de alegria e momentos inesquecíveis!"
            {...register("mensagemEspecial.mensagem")}
            maxLength={1000}
          />
          <ButtonUi
            icon={<HiOutlineSparkles className="hidden sm:block w-5 h-5" />}
            element="div"
            text="Gerar IA"
            onClick={gerarMensagemComIA}
            className="max-sm:text-[12px] w-full sm:w-[25%] sm:min-w-[125px] h-[45px]"
          />
        </div>
        <div className="h-[22px]">
          {fieldError && <MsgErrorInput msg={fieldError.message || ""} />}
        </div>
      </div>
      <div>
        <label htmlFor="titulo" className={`${style.classLabel}`}>
          Autor
        </label>
        <input
          id="titulo"
          className={style.classInput}
          placeholder="Ex: Gabriel"
          {...register("mensagemEspecial.autor")}
        />
        <span className="text-[12px] sm:text-sm text-gray-600">
          Esse campo é opcional, se não quiser se identificar deixe em branco.
        </span>
      </div>
    </div>
  );
}

export default TerceiraEtapa;
