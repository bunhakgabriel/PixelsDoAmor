export interface ISpotifyAniversario {
    titulo: string
    nome?: string
    fotoPrincipal: string
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
    albumMemorias: string[]
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
    data: 'undefined'
}