import YouTubeSearch from "../../../../../components/YoutubeSearch/YoutubeSearch";
import type { ISpotifyModel } from "../../../../../models/ISpotify";

function QuintaEtapa() {
  return (
    <div>
      <YouTubeSearch<ISpotifyModel>
        type="list"
        maxMusicas={3}
        name="musicas"
        label="Escolha até 3 músicas"
      />
    </div>
  );
}

export default QuintaEtapa;