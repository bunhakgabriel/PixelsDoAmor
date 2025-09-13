import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import type { Comentario, ISpotifyModel } from "../models/ISpotify";
import { firestore, storage } from "../firebase/firebase-config";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const SpotifyService = {
  postCartao: async (data: ISpotifyModel) => {
    const idDocumento = uuidv4();

    const uploadedRefs: any[] = [];

    try {
      // 1. upload da fotoPrincipal
      const fotoPrincipalFile = data.fotoPrincipal.imagem as File;
      const fotoPrincipalRef = ref(
        storage,
        `${idDocumento}/fotoPrincipal_${Date.now()}_${fotoPrincipalFile.name}`
      );
      const fotoPrincipalSnapshot = await uploadBytes(
        fotoPrincipalRef,
        fotoPrincipalFile
      );
      uploadedRefs.push(fotoPrincipalRef);
      const fotoPrincipalUrl = await getDownloadURL(fotoPrincipalSnapshot.ref);

      // 2. upload das imagens do albumMemorias em paralelo
      const albumPromises = data.albumMemorias.map(async (item, index) => {
        const file = item.imagem as File;
        const fileRef = ref(
          storage,
          `${idDocumento}/album_${Date.now()}_${index}_${file.name}`
        );
        const snapshot = await uploadBytes(fileRef, file);
        uploadedRefs.push(fileRef);
        const url = await getDownloadURL(snapshot.ref);

        return { imagem: url, previewImagem: "" };
      });

      const albumComUrls = await Promise.all(albumPromises);

      // 3. objeto final com URLs
      const dataFinal: ISpotifyModel = {
        ...data,
        id: idDocumento,
        fotoPrincipal: { imagem: fotoPrincipalUrl, previewImagem: "" },
        albumMemorias: albumComUrls,
      };

      // 4. salva no Firestore
      await setDoc(doc(firestore, "cartoes-spotify", dataFinal.id!), dataFinal);

      // 5. retorna objeto salvo
      return dataFinal;
    } catch (error) {
      console.error("Erro ao salvar, revertendo uploads:", error);

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

      throw error; // repassa o erro para o chamador
    }
  },
  getCartao: async (id: string): Promise<ISpotifyModel> => {
    try {
      const docRef = doc(firestore, "cartoes-spotify", id);
      const docSnap = await getDoc(docRef);
      return docSnap.data() as ISpotifyModel;
    } catch (error) {
      console.error("Erro ao buscar documento:", error);
      throw error;
    }
  },
  postComentario: async (
    documentoId: string,
    novoComentario: Comentario
  ): Promise<void> => {
    try {
      const docRef = doc(firestore, "cartoes-spotify", documentoId);

      await updateDoc(docRef, {
        "comentarios.listaComentarios": arrayUnion(novoComentario),
      });

      console.log("Comentário adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      throw error;
    }
  },
};
