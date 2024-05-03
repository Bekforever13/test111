import { Outlet } from "react-router-dom"
import { Header } from "./Header"

const AppLayout = () => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header />
      <div className="py-10 px-[15%]">
        <Outlet />
      </div>
    </div>
  )
}

export { AppLayout }
