import { create } from "zustand"
import type { ISpotifyModel } from "../models/ISpotify"

type ConfigStore = {
    playingSong: boolean
    setplayingSong: (value: boolean) => void,
    indexSong: number
    setIndexSong: (value: number) => void
    previewCartao: boolean
    setPreviewCartao: (value: boolean) => void
    data: ISpotifyModel | null
    setData: (value: ISpotifyModel) => void
}

export const useConfigStoreSpotify = create<ConfigStore>((set) => ({
    playingSong: false,
    setplayingSong: (value: boolean) => {
        set({ playingSong: value })
    },
    indexSong: 0,
    setIndexSong: (value: number) => {
        set({ indexSong: value })
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