export interface ISpotifyModel {
  type: "spotify";
  id?: string;
  titulo: string;
  nome?: string;
  fotoPrincipal: Imagem;
  musicas: {
    nome: string;
    url: string;
  }[];
  musicaPrincipal: {
    nome: string;
    url: string;
  };
  mensagemEspecial: {
    autor?: string;
    mensagem: string;
  };
  albumMemorias: Imagem[];
  comentarios: Comentarios;
  data?: string;
  status: "ativo" | "pendente";
  dataCriacao: string;
  animacao: "flocos" | "coracao-preto" | "coracao-vermelho" | "rosa" | "sem-animacao" | "";
}

export interface Comentarios {
  habilitado: boolean;
  listaComentarios: Comentario[];
}

export interface Comentario {
  id: number;
  autor: string;
  mensagem: string;
}

export interface Imagem {
  imagem: string | File;
  previewImagem: string;
}

export const defaultValueSpotifyObject: ISpotifyModel = {
  type: "spotify",
  id: "",
  titulo: "",
  nome: "",
  fotoPrincipal: {
    imagem: "",
    previewImagem: "",
  },
  musicas: [],
  musicaPrincipal: {
    nome: "",
    url: "",
  },
  mensagemEspecial: {
    autor: "",
    mensagem: "",
  },
  albumMemorias: [],
  comentarios: {
    habilitado: false,
    listaComentarios: [],
  },
  data: "",
  status: "pendente",
  dataCriacao: new Date().toISOString(),
  animacao: "",
};
