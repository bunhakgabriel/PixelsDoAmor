import { create } from "zustand"
import type { ISpotifyModel } from "../models/ISpotify"

type ConfigStore = {
    playingSong: boolean
    setplayingSong: (value: boolean) => void,
    indexSong: number | undefined
    setIndexSong: (value: number | undefined) => void
    previewCartao: boolean
    setPreviewCartao: (value: boolean) => void
    data: ISpotifyModel | null
    setData: (value: ISpotifyModel | null) => void
    etapaAtual: number  
    setEtapaAtual: (value: number) => void
}

export const useConfigStoreSpotify = create<ConfigStore>((set) => ({
    playingSong: false,
    setplayingSong: (value: boolean) => {
        set({ playingSong: value })
    },
    indexSong: undefined,
    setIndexSong: (value: number | undefined) => {
        set({ indexSong: value })
    },
    previewCartao: false,
    setPreviewCartao: (value: boolean) => {
        set({ previewCartao: value })
    },
    data: null,
    setData: (value: ISpotifyModel | null) => {
        set({ data: value })
    },
    etapaAtual: 0,
    setEtapaAtual: (value: number) => {
        set({ etapaAtual: value })
    }
}))