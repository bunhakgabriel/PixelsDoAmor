import * as Yup from "yup";
import type { Imagem, ISpotifyModel } from "../../../../../models/ISpotify";
import { converterData } from "../../../../../utils/converterData";

export const SpotifySchema: Yup.Schema<ISpotifyModel> = Yup.object({
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
    previewImagem: Yup.string().optional(),
  }).required("Campo obrigatório"),

  data: Yup.string()
    .optional()
    .test("valid-date", "Data inválida", (value) => {
      if (!value || value.trim() == "" || value.length == 0) return true;
      const data = converterData(value || "");
      if (data && data.length > 1) return true;
      return false;
    }),

  musicas: Yup.mixed<{ nome: string; url: string }[]>().test(
    "not-empty",
    "Mínimo 2 músicas",
    (value) => {
      if (value && value.length < 2) {
        return false;
      }
      return true;
    }
  ),

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

  albumMemorias: Yup.mixed<Imagem[]>().test(
    "not-empty",
    "Mínimo 3 fotos",
    (value) => {
      if (value && value.length < 3) {
        return false;
      }
      return true;
    }
  ),

  musicaPrincipal: Yup.object({
    nome: Yup.string()
      .test("not-empty", "Escolha uma música principal", (value) => {
        if (value === null || value === undefined || value.trim() === "")
          return false;
        return true;
      })
      .required("Escolha uma música principal"),
    url: Yup.string().test(
      "not-empty",
      "Escolha uma música principal",
      (value) => {
        if (value === null || value === undefined || value.trim() === "")
          return false;
        return true;
      }
    ),
  }).required("Escolha uma música principal"),
});
