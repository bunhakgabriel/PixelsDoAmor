export interface ISpotifyAniversario {
    titulo: string
    nome?: string
    fotoPrincipal: Imagem
    musicas: {
        nome: string
        url: string
    }[]
    musicaPrincipal: {
        nome: string
        url: string
    }
    mensagemEspecial: {
        autor?: string
        mensagem: string
    }
    albumMemorias: Imagem[]
    comentarios: Comentarios
    data?: string
}

export interface Comentarios {
    habilitado: boolean
    listaComentarios: Comentario[]
}

export interface Resposta {
    id: number;
    autor: string;
    mensagem: string;
}

export interface Comentario {
    id: number;
    autor: string;
    mensagem: string;
    curtidas: number;
    curtido: boolean;
    respostas: Resposta[];
}

export interface Imagem {
    imagem: string | File
    previewImagem: string
}


export const defaultValueSpotifyObject: ISpotifyAniversario = {
    titulo: '',
    nome: '',
    fotoPrincipal: {
        imagem: '',
        previewImagem: ''
    },
    musicas: [],
    musicaPrincipal: {
        nome: '',
        url: ''
    },
    mensagemEspecial: {
        autor: '',
        mensagem: ''
    },
    albumMemorias: [],
    comentarios: {
        habilitado: false,
        listaComentarios: []
    },
    data: ''
}