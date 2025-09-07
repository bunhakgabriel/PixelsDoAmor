import YouTubeSearch from "../../../../../components/YoutubeSearch/YoutubeSearch"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"

function TerceiraEtapa() {
  return (
    <div>
      <YouTubeSearch<ISpotifyAniversario>
        type="list"
        maxMusicas={4}
        name="musicas"
        label="Escolha até 4 músicas"
        apiKey={'AIzaSyAtkhDgYKvwpI32X58iWR1KpWO1qafgJYo'}
      />
    </div>
  )
}

export default TerceiraEtapa
