import YouTubeSearch from "../../../../../components/YoutubeSearch/YoutubeSearch";
import type { ISpotifyModel } from "../../../../../models/ISpotify";

function QuintaEtapa() {
  return (
    <div>
      <YouTubeSearch<ISpotifyModel>
        type="list"
        maxMusicas={4}
        name="musicas"
        label="Escolha até 4 músicas"
        apiKey={"AIzaSyAtkhDgYKvwpI32X58iWR1KpWO1qafgJYo"}
      />
    </div>
  );
}

export default QuintaEtapa;