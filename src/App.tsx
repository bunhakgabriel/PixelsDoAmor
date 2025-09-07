import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer
      className='!p-2 !w-[350px]'
        position="top-left"
        autoClose={2500} // tempo em ms
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <div className="h-[68px] sm:h-[72px] bg-black"></div>
      <Outlet />
    </>
  )
}

export default App
