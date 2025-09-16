import { create } from "zustand"
import type { ISpotifyModel } from "../models/ISpotify"

type ConfigStore = {
    playingSongMain: boolean
    setPlayingSongMain: (value: boolean) => void,
    previewCartao: boolean
    setPreviewCartao: (value: boolean) => void
    data: ISpotifyModel | null
    setData: (value: ISpotifyModel) => void
}

export const useConfigStoreSpotify = create<ConfigStore>((set) => ({
    playingSongMain: false,
    setPlayingSongMain: (value: boolean) => {
        set({ playingSongMain: value })
    },
    previewCartao: false,
    setPreviewCartao: (value: boolean) => {
        set({ previewCartao: value })
    },
    data: null,
    setData: (value: ISpotifyModel) => {
        set({ data: value })
    }
}))