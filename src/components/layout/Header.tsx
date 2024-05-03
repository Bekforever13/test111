import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const { pathname } = useLocation()
  return (
    <header className='flex items-center justify-between w-full py-5 px-[15%] shadow-md'>
      <span className='font-semibold text-3xl'>LOGO</span>
      <nav>
        <ul className='flex items-center gap-5'>
          <li
            className={`transition-transform hover:-translate-y-1 text-lg ${
              pathname === "/" ? "text-blue-400" : ""
            }`}
          >
            <Link to='/'>Task 1</Link>
          </li>
          <li
            className={`transition-transform hover:-translate-y-1 text-lg ${
              pathname === "/second-task" ? "text-blue-400" : ""
            }`}
          >
            <Link to='/second-task'>Task 2</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export { Header }
