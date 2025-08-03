export interface ISpotifyAniversario {
    titulo: string
    nome?: string
    fotoPrincipal: string
    musicas: {
        nome: string
        url: string
    }[]
    mensagemEspecial: {
        autor?: string
        mensagem: string
    }
    albumMemorias: string[]
    comentarios: Comentarios
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