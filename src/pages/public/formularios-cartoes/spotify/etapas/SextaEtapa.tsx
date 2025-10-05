import { useFormContext } from "react-hook-form";
import type { ISpotifyModel } from "../../../../../models/ISpotify";
import { style } from "../../../../../utils/classesCssGlobais";
import MsgErrorInput from "../../../../../components/MsgErrorInput/MsgErrorInput";
import clsx from "clsx";

function SextaEtapa() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ISpotifyModel>();

  return (
    <div className="flex flex-col gap-4">
      {/* Funcionalidade de comentários, por enquanto não vai ser implementada */}
      {/* <div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="comentarios"
            className="w-5 h-5 cursor-pointer"
            placeholder="Ex: Bruna Silva"
            {...register("comentarios.habilitado")}
          />
          <label
            htmlFor="comentarios"
            className={`${style.classLabel} cursor-pointer`}
          >
            Habilitar comentários
          </label>
        </div>
        <span className="text-[12px] sm:text-sm text-gray-600">
          Campo opcional, ao habilitar você permite que seus amigos e outros
          visitantes da web page deixem suas mensagens, comentarios e interajam
          com a página, você como administrador pode a qualquer momento
          desabilitar essa opção e excluir comentários indesejados.
        </span>
      </div> */}
      <div className="mt-4 flex flex-col gap-2">
        <label
          htmlFor="animcao"
          className={`${style.classLabel} cursor-pointer`}
        >
          Selecione uma animação para a página
        </label>
        <select
          className={clsx('border border-gray-300 rounded-md w-full p-2', {
            'border-red-500': errors.animacao
          })}
          id="animacao"
          {...register("animacao")}
        >
          <option value="">Selecione...</option>
          <option value="sem-animacao">Sem animação</option>
          <option value="flocos">Flocos de neve</option>
          <option value="coracao-vermelho">Corações vermelhos</option>
          <option value="coracao-preto">Corações pretos</option>
          <option value="rosa">Rosas</option>
        </select>
        <div className="h-[10px]">
          {errors.animacao && <MsgErrorInput msg={errors.animacao.message || ""} />}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>
          <div className="flex gap-4 items-center">
            <label htmlFor="nome" className={`${style.classLabel}`}>
              Email
            </label>
            <span className="text-[12px] sm:text-sm text-gray-600">
              (Obs: O QrCode para acessar a WebPage será enviado para o email informado)
            </span>
          </div>
          <input
            type="text"
            id="nome"
            className={`${style.classInput} ${
                errors.email ? style.error : ""
              }`}
            placeholder="Ex: brunosilva@gmail.com"
            {...register("email")}
          />

        </div>
        <div className="h-[20px]">
          {errors.email && (
            <MsgErrorInput msg={errors.email.message || ""} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SextaEtapa;
