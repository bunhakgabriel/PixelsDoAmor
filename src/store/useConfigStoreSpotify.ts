import { create } from "zustand"

type ConfigStore = {
    playingSongMain: boolean
    setPlayingSongMain: (value: boolean) => void,
    previewCartao: boolean
    setPreviewCartao: (value: boolean) => void
    realizarPagamento: boolean
    setRealizarPagamento: (value: boolean) => void
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
    realizarPagamento: false,
    setRealizarPagamento: (value: boolean) => {
        set({ realizarPagamento: value })
    },
}))