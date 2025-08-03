import type { EtapaProps } from "../../../../../types/FormType"
import type { ISpotifyAniversario } from "../../../../../models/ISpotify"
import YouTubeSearch from "../../../../../components/YoutubeSearch/YoutubeSearch"

function TerceiraEtapa({ form }: EtapaProps<ISpotifyAniversario>) {
  return (
    <div>
      <YouTubeSearch
        form={form}
        name="musicas"
        label="Escolha até 5 músicas"
        apiKey={'AIzaSyAtkhDgYKvwpI32X58iWR1KpWO1qafgJYo'}
      />
    </div>
  )
}

export default TerceiraEtapa
