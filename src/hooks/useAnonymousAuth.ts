import { getAuth, signInAnonymously, signOut } from "firebase/auth";
import { userAnonymousStore } from "../store/userAnonymousStore";

export function useAnonymousAuth() {
  const auth = getAuth();
  const { setUser } = userAnonymousStore()
  
  async function loginAnonimo() {
    if(auth.currentUser) return setUser(auth.currentUser)
    try {
      const result = await signInAnonymously(auth);
      setUser(result.user);
      return result.user;
    } catch (err) {
      console.error("Erro ao autenticar anonimamente:", err);
      throw err;
    }
  }

  async function logoutAndDelete() {

    if (auth.currentUser) {
      try {
        await auth.currentUser.delete(); // deleta o usuário do painel
        await signOut(auth); // desloga
        setUser(null);
      } catch (err) {
        console.error("Erro ao deslogar e deletar usuário:", err);
        throw err;
      }
    }
  }

  async function runWithAnonymousAuth(fn: () => Promise<any>) {
    await loginAnonimo();
    try {
      return await fn();
    } finally {
      await logoutAndDelete();
    }
  }

  return { loginAnonimo, logoutAndDelete, runWithAnonymousAuth };
}
