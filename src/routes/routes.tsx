import App from "../App";
import Preview from "../components/Preview/Preview";
import SpotifyForm from "../pages/public/formularios-cartoes/spotify/SpotifyForm";
import Home from "../pages/public/Home/Home";
import PageCartao from "../pages/public/page-cartao/PageCartao";
import Parabens from "../pages/public/Parabens/Parabens";

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <h1>ERRO 404! Página não encontrada.</h1>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/spotify-theme',
                element: <Preview />
            },
            {
                path: '/form-cadastro-spotify',
                element: <SpotifyForm />
            },
            {
                path: '/parabens/:encodedUrl',
                element: <Parabens />
            },
        ]
    },
    {
        path: '/cartao-digital/:identCartao',
        element: <PageCartao />
    }
]

export default routes;