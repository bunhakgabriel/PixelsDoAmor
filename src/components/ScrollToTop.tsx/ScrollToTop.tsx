// ScrollToTop.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingBlock from "../Loading/LoadingBlock";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [pathname]);

    if(loading){
        return <LoadingBlock text="Carregando..." size={30} />
    } else {
        return null;
    }
}
