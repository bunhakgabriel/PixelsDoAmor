import { useFormContext } from "react-hook-form";
import { HiOutlineSparkles } from "react-icons/hi2";
import ButtonUi from "../../../../../components/ButtonUi/ButtonUi";
import MsgErrorInput from "../../../../../components/MsgErrorInput/MsgErrorInput";
import type { ISpotifyModel } from "../../../../../models/ISpotify";
import { style } from "../../../../../utils/classesCssGlobais";
import { gerarTituloCartao } from "../../../../../utils/gerarTituloCartao";

function PrimeiraEtapa() {
  const {
    register,
    formState: { errors },
    setValue,
    trigger
  } = useFormContext<ISpotifyModel>();

  async function gerarTituloComIA() { 
    const titulo = gerarTituloCartao()
    setValue("titulo", titulo)
    await trigger("titulo")
  }

  return (
    <div className="flex gap-6 flex-col">
      <div>
        <label htmlFor="titulo" className={`${style.classLabel}`}>
          Titulo do cartão *
        </label>
        <div className="flex gap-2">
          <div className="w-full">
            <input
              type="text"
              id="titulo"
              className={`${style.classInput} ${
                errors.titulo ? style.error : ""
              }`}
              placeholder="Ex: Para alguém especial!"
              {...register("titulo")}
            />
            <div className="h-[20px]">
              {errors.titulo && (
                <MsgErrorInput msg={errors.titulo.message || ""} />
              )}
            </div>
          </div>

          <ButtonUi
            icon={<HiOutlineSparkles className="hidden sm:block w-5 h-5" />}
            element="div"
            text="Gerar IA"
            onClick={gerarTituloComIA}
            className="max-sm:text-[12px] w-[110px] sm:w-[25%] sm:min-w-[125px] h-[45px]"
          />
        </div>
      </div>
      <div>
        <label htmlFor="nome" className={`${style.classLabel}`}>
          Nome da pessoa a presentear
        </label>
        <input
          type="text"
          id="nome"
          className={style.classInput}
          placeholder="Ex: Bruna Silva"
          {...register("nome")}
        />
        <span className="text-[12px] sm:text-sm text-gray-600">
          Esse campo é opcional, se o cartão não for pra presentear uma pessoa e
          tiver outro propósito pode deixa-lo em branco.
        </span>
      </div>
    </div>
  );
}

export default PrimeiraEtapa;
