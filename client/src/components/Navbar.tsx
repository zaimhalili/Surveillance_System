import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="max-w-360 mx-auto fixed">
      <ul className="flex w-screen max-w-screen overflow-hidden justify-between gap-10 px-20 py-7 text-sm text-(--black)/30">
        <li>Logo</li>
        <li><Link to={'/login'} className="">Get Started</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar