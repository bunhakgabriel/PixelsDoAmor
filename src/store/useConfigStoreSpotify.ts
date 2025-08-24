import { create } from "zustand"

type ConfigStore = {
    playingSongMain: boolean
    setPlayingSongMain: (value: boolean) => void
}

export const useConfigStoreSpotify = create<ConfigStore>((set) => ({
    playingSongMain: false,
    setPlayingSongMain: (value: boolean) => {
        set({ playingSongMain: value })
    }
}))