import { dadosPreviewSpotify } from "./dados";
import SpotifyTema from "./temas/spotify/SpotifyPreview";

function Preview() {
    return (
        <SpotifyTema model={dadosPreviewSpotify} />
    )
}

export default Preview;