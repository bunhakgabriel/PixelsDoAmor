import { create } from "zustand"
import type { User } from "firebase/auth"

type ConfigStore = {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const userAnonymousStore = create<ConfigStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))