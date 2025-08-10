export interface ISpotifyAniversario {
    titulo?: string
    nome?: string
    fotoPrincipal?: string
    musicas?: {
        nome?: string
        url?: string
    }[]
    musicaPrincipal?: {
        nome?: string
        url?: string
    }
    mensagemEspecial?: {
        autor?: string
        mensagem?: string
    }
    albumMemorias?: string[]
    comentarios?: Comentarios | undefined
    data?: DataType | undefined
}

export interface Comentarios {
    habilitado?: boolean
    listaComentarios?: Comentario[]
}

export interface DataType {
    valor?: string
    formato?: 'completo' | 'anos' | 'dias' | 'meses'
    texto?: string
}


export interface Resposta {
    id?: number;
    autor?: string;
    mensagem?: string;
}

export interface Comentario {
    id?: number;
    autor?: string;
    mensagem?: string;
    curtidas?: number;
    curtido?: boolean;
    respostas?: Resposta[];
}

export const defaultValueSpotifyObject: ISpotifyAniversario = {
    titulo: '',
    nome: '',
    fotoPrincipal: '',
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
    data: undefined
}