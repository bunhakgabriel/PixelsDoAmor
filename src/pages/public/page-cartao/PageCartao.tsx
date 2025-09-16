import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import { SpotifyService } from "../../../services/spotify-service";
import SpotifyTema from "../../../components/Preview/temas/spotify/SpotifyTema";

function PageCartao() {
    const { identCartao } = useParams();
    const tipoCartao = identCartao?.slice(0, 1); 

    const { data, isLoading } = useQuery({
        queryKey: ['cartao-usuario'],
        queryFn: () => {
            if(tipoCartao == '1' && identCartao){
                return SpotifyService.getCartao(identCartao.slice(1))
            }
             return Promise.resolve(null);
        },
        enabled: !!identCartao,
    })

    if(isLoading){
        return <Loading size={20} text="Carregando..." />
    }

    return (
        <div>
            {tipoCartao == '1' && data && (
                <SpotifyTema model={data} variant="page"/>
            )}
        </div>
    )
}

export default PageCartao;
