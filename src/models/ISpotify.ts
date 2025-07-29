export interface ISpotifyAniversario {
    titulo: string
    nome?: string
    fotoPrincipal: string
    musicas: {
        nome: string
        duracao: string
    }[]
    mensagemParabens: {
        autor?: string
        mensagem: string
    }
    albumMemorias: string[]
}