export interface ISpotifyAniversario {
    titulo: string
    nome?: string
    fotoPrincipal: string
    musicas: {
        nome: string
        url: string
    }[]
    mensagemParabens: {
        autor?: string
        mensagem: string
    }
    albumMemorias: string[]
}