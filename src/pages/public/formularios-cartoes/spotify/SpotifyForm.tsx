import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Modal from "react-modal";
import BackButton from "../../../../components/BackButton/BackButon";
import ButtonUi from "../../../../components/ButtonUi/ButtonUi";
import SpotifyTema from "../../../../components/Preview/temas/spotify/SpotifyTema";
import {
  defaultValueSpotifyObject,
  type ISpotifyModel,
} from "../../../../models/ISpotify";
import { useConfigStoreSpotify } from "../../../../store/useConfigStoreSpotify";
import PrimeiraEtapa from "./etapas/PrimairaEtapa";
import QuartaEtapa from "./etapas/QuartaEtapa";
import QuintaEtapa from "./etapas/QuintaEtapa";
import SegundaEtapa from "./etapas/SegundaEtapa";
import SextaEtapa from "./etapas/SextaEtapa";
import TerceiraEtapa from "./etapas/TerceiraEtapa";
import { SpotifySchema } from "./schema/SpotifySchema";
import { useMutation } from '@tanstack/react-query'
import { SpotifyService } from "../../../../services/spotify-service";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { HiOutlineSparkles } from "react-icons/hi2";
const etapas = ["", "", "", "", "", ""];

function SpotifyForm() {
  const form = useForm<ISpotifyModel>({
    defaultValues: defaultValueSpotifyObject,
    resolver: yupResolver(SpotifySchema),
    mode: "onChange",
  });
  const { control, trigger } = form;
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => SpotifyService.postCartao(model),
    onSuccess: (data) => {
      if (data?.id) {
        toast.success('WebPage criada com sucesso, finalize pagamento para continuar!', { autoClose: 5000 })
        setData(data)
        localStorage.setItem('cartao-atual', JSON.stringify(data))
        // const encodedUrl = encodeURIComponent(data.id)
        // navigate(`/parabens/1${encodedUrl}`)
        navigate(`/pagamento`)
      }
    },
    onError: (error) => {
      console.log('Erro ao salvar: ', error)
      toast.error('Erro ao salvar cartão, tente novamente!')
    }
  })

  const { previewCartao, setPreviewCartao, data, setData } = useConfigStoreSpotify();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const model = useWatch<ISpotifyModel>({ control }) as ISpotifyModel;

  async function avancarEtapa() {
    const camposPorEtapa: (keyof ISpotifyModel)[][] = [
      ["titulo", "nome"],
      ["fotoPrincipal", "data"],
      ["musicas"],
      ["mensagemEspecial"],
      ["albumMemorias"],
      ["animacao", "musicaPrincipal"]
    ];

    const camposDaEtapaAtual = camposPorEtapa[etapaAtual];
    const valido = await trigger(camposDaEtapaAtual);

    if (valido) {
      setData(model);
      if (etapaAtual == 5) {
        mutation.mutate()
      } else {
        setEtapaAtual((prev) => prev + 1);
      }
    }

  }

  function voltarEtapa() {
    if (etapaAtual === 0) return navigate(-1);
    setEtapaAtual((prev) => prev - 1);
  }

  useEffect(() => {
    console.log("Model atualizado:", data);
  }, [data]);

  if (mutation.isPending) {
    return <Loading text="Aguarde alguns instantes enquanto sua página é criada..." size={60} />
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col lg:flex-row p-6 gap-8 lg:gap-16 max-lg:items-center">
        <div className="flex flex-col w-full lg:w-3/5 max-sm:gap-4">
          <div className="flex flex-col gap-4">
            <BackButton text="Voltar" color="blue" onClick={voltarEtapa} />
            <div className="flex gap-2">
              {etapas.map((_, index) => (
                <span
                  key={index}
                  className={clsx("rounded-2xl w-full h-[10px]", {
                    "bg-gradient-to-r from-purple-600 to-pink-600":
                      etapaAtual >= index,
                    "bg-[#E5E7EB]": etapaAtual < index,
                  })}
                ></span>
              ))}
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-[#4B5563] text-sm sm:text-lg">
                Etapa <span>{etapaAtual + 1}</span> de{" "}
                <span>{etapas.length}</span>
              </p>
            </div>
          </div>

          <form className="flex gap-6 flex-col">
            {etapaAtual === 0 && <PrimeiraEtapa />}
            {etapaAtual === 1 && <SegundaEtapa />}
            {etapaAtual === 2 && <TerceiraEtapa />}
            {etapaAtual === 3 && <QuartaEtapa />}
            {etapaAtual === 4 && <QuintaEtapa />}
            {etapaAtual === 5 && <SextaEtapa />}
          </form>
          <ButtonUi
            className="w-[100%] h-[40px] sm:my-4"
            text={etapaAtual == 5 ? "Salvar" : "Próximo"}
            onClick={avancarEtapa}
            element="button"
          />
          <button
            onClick={() => setPreviewCartao(true)}
            className="cursor-pointer inline-flex items-center justify-center space-x-2 bg-white text-purple-600 px-6 py-2 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <HiOutlineSparkles className="w-5 h-5" />
            <span>Ver prévia em tela cheia</span>
          </button>
        </div>

        {!previewCartao && (
          <div className="w-full sm:w-[500px] lg:w-[2/5]">
            <SpotifyTema
              variant="preview"
              model={model || defaultValueSpotifyObject}
            />
          </div>
        )}

        <Modal
          isOpen={previewCartao}
          onRequestClose={() => setPreviewCartao(false)}
        >
          <button
            type="button"
            onClick={() => setPreviewCartao(false)}
            className="fixed cursor-pointer w-10 top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            X
          </button>
          {/* <Preview /> */}
          <SpotifyTema
            variant="modal"
            model={model || defaultValueSpotifyObject}
          />
        </Modal>
      </div>
    </FormProvider>
  );
}

export default SpotifyForm;
