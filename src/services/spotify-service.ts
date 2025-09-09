import type { ISpotifyModel } from "../models/ISpotify";

export const SpotifyService = {
  postCartao: async (data: ISpotifyModel) => {
    console.log("Data received:", data);
  },
  getCartao: async (id: number): Promise<ISpotifyModel> => {
    console.log("Fetching data for ID:", id);
    return {} as ISpotifyModel;
  },
};
