import { useNavigate } from "react-router-dom";
import SpotifyTema from "../../../../../components/Preview/temas/spotify/SpotifyTema";
import { previaCartao } from "./dados";

function PreviaCartao() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="fixed cursor-pointer w-10 top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
      >
        X
      </button>
      {/* <Preview /> */}
      <SpotifyTema variant="page" model={previaCartao} />
    </div>
  );
}
export default PreviaCartao;
