import App from "../App";
import SpotifyForm from "../pages/public/formularios-cartoes/spotify/SpotifyForm";
import Home from "../pages/public/Home/Home";
import PageCartao from "../pages/public/page-cartao/PageCartao";
import Parabens from "../pages/public/Parabens/Parabens";
import PagamentoPage from "../pages/public/pagamento/Pagamento";
import PreviaCartao from "../pages/public/Home/componentes/previa-cartao/PreviaCartao";

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
                path: '/form-cadastro-spotify',
                element: <SpotifyForm />
            },
            {
                path: '/parabens/:encodedUrl',
                element: <Parabens />
            },
            {
                path: '/pagamento',
                element: <PagamentoPage />
            }
        ]
    },
    {
        path: '/cartao-digital/:identCartao',
        element: <PageCartao />
    },
    {
        path: '/previa-cartao/:type',
        element: <PreviaCartao />
    }
]

export default routes;