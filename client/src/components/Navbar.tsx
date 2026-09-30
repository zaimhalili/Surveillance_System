import { Link } from "react-router-dom";
import { FaVideo } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="max-w-360 mx-auto fixed">
      <ul className="flex w-screen max-w-screen overflow-hidden justify-between gap-10 px-20 py-7 text-sm text-(--black)/30">
        <li className="hover:text-(--black) cursor-pointer flex gap-2 group text-md! transition-all"><Link to={'/'}><FaVideo /><span className="hidden hover:flex">CCTV System</span></Link></li>
        <li><Link to={'/login'} className="hover:text-(--black) cursor-pointer font-bold transition-all px-3 py-2 rounded-2xl">Get Started</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar