import * as Yup from "yup";
import type { Imagem, ISpotifyModel } from "../../../../../models/ISpotify";
import { converterData } from "../../../../../utils/converterData";

export const SpotifySchema: Yup.ObjectSchema<ISpotifyModel> = Yup.object({
  id: Yup.string().optional(),

  titulo: Yup.string().required("Campo obrigatório"),

  nome: Yup.string().optional(),

  fotoPrincipal: Yup.object({
    imagem: Yup.mixed<File | string>()
      .test("not-empty", "Campo obrigatório", (value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        return true;
      })
      .required("Campo obrigatório"),
    previewImagem: Yup.string().required(),
  }).required("Campo obrigatório"),

  data: Yup.string()
    .optional()
    .test("valid-date", "Data inválida", (value) => {
      if (!value || value.trim() == "" || value.length == 0) return true;
      const data = converterData(value || "");
      if (data && data.length > 1) return true;
      return false;
    }),

  musicas: Yup.mixed<{ nome: string; url: string }[]>()
    .required("É necessário informar músicas")
    .test("not-empty", "Mínimo 1 música", (value) => {
      if (value && value.length < 1) {
        return false;
      }
      return true;
    }),

  mensagemEspecial: Yup.object({
    mensagem: Yup.string()
      .test("not-empty", "Campo obrigatório", (value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        return true;
      })
      .max(1000, "Máximo de 1000 caracteres")
      .required("Campo obrigatório"),
    autor: Yup.string().optional(),
  }).required("Campo obrigatório"),

  albumMemorias: Yup.mixed<Imagem[]>().required().test(
    "not-empty",
    "Mínimo 3 fotos",
    (value) => {
      if (value && value.length < 3) {
        return false;
      }
      return true;
    }
  ),

  comentarios: Yup.object({
    habilitado: Yup.boolean().required(),
    listaComentarios: Yup.array().min(0).required(),
  }),

  type: Yup.mixed<"spotify">().oneOf(["spotify"]).required(),

  status: Yup.mixed<"ativo" | "pendente">()
    .oneOf(["ativo", "pendente"])
    .required(),

  dataCriacao: Yup.string().required(),

  animacao: Yup.mixed<"flocos" | "coracao-preto" | "coracao-vermelho" | "rosa" | "sem-animacao">()
    .oneOf(["flocos", "coracao-preto", "coracao-vermelho", "rosa", "sem-animacao"], "É necessário escolher uma opção")
    .required("É necessário escolher uma opção"),

  email: Yup
    .string()
    .trim()
    .required("O email é obrigatório")
    .email("Digite um email válido"),
});
