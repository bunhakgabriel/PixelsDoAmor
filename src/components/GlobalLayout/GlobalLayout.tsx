import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop.tsx/ScrollToTop";

export default function GlobalLayout() {
    return (
        <>
            <ScrollToTop />
            <Outlet /> {/* Renderiza a rota filha */}
        </>
    );
}