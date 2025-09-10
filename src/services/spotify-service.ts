import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { ISpotifyModel } from "../models/ISpotify";
import { storage } from "../firebase/firebase-config";
import { v4 as uuidv4 } from 'uuid'

export const SpotifyService = {
  postCartao: async (data: ISpotifyModel) => {
    console.log("Data received:", data);

    const uploadedRefs: any[] = [];

    try {
      const idPrincipal = uuidv4();
      console.log('id: ', idPrincipal)
      // upload da fotoPrincipal
      const fotoPrincipalFile = data.fotoPrincipal.imagem as File;
      const fotoPrincipalRef = ref(storage, `${idPrincipal}/fotoPrincipal_${Date.now()}_${fotoPrincipalFile.name}`);
      const fotoPrincipalSnapshot = await uploadBytes(fotoPrincipalRef, fotoPrincipalFile);
      uploadedRefs.push(fotoPrincipalRef);
      const fotoPrincipalUrl = await getDownloadURL(fotoPrincipalSnapshot.ref);

      // upload das imagens do albumMemorias em paralelo
      const albumPromises = data.albumMemorias.map(async (item, index) => {
        const file = item.imagem as File;
        const fileRef = ref(storage, `${idPrincipal}/album_${Date.now()}_${index}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        uploadedRefs.push(fileRef);
        const url = await getDownloadURL(snapshot.ref);

        return { ...item, url };
      });

      const albumComUrls = await Promise.all(albumPromises);

      // se chegou aqui, deu tudo certo
      return {
        ...data,
        fotoPrincipal: { ...data.fotoPrincipal, url: fotoPrincipalUrl },
        albumMemorias: albumComUrls,
      };

    } catch (error) {
      console.error("Erro ao salvar imagens, revertendo uploads:", error);

      // rollback: deletar tudo que já foi enviado
      await Promise.all(
        uploadedRefs.map(async (fileRef) => {
          try {
            await deleteObject(fileRef);
          } catch (delError) {
            console.warn("Erro ao deletar arquivo durante rollback:", delError);
          }
        })
      );

      throw error; // propaga o erro para quem chamou
    }

  },
  getCartao: async (id: number): Promise<ISpotifyModel> => {
    console.log("Fetching data for ID:", id);
    return {} as ISpotifyModel;
  },
};
