import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"

function App() {
  return (
    <>
      <Header />
      <div className="h-[68px] sm:h-[72px] bg-black"></div>
      <Outlet />
    </>
  )
}

export default App
