import { create } from "zustand"
import type { ISpotifyAniversario } from "../models/ISpotify"

type ConfigStore = {
    data: Partial<ISpotifyAniversario>
    setField: (field: keyof ISpotifyAniversario, value: any) => void
    setData: (data: Partial<ISpotifyAniversario>) => void
    playingSongMain: boolean
    setPlayingSongMain: (value: boolean) => void
}

export const useConfigStore = create<ConfigStore>((set) => ({
    data: {},
    setField: (field, value) =>
        set((state) => ({
            data: { ...state.data, [field]: value },
        })),
    setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),

    playingSongMain: false,
    setPlayingSongMain: (value: boolean) => {
        set({ playingSongMain: value })
    }
}))