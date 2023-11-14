import { useState } from "react";
import close from "../assets/close.png"; // Replace "close.png" with the actual asset file name.
import logo from "../assets/logo.png"; // Replace "logo.png" with the actual asset file name.
import menu from "../assets/menu.png"; // Replace "menu.png" with the actual asset file name.
import { Link } from 'react-router-dom';

export const navLinks = [
  {
    id: "",
    title: "Home",
  },
  {
    id: "eatclips",
    title: "EatClips",
  },
  {
    id: "product",
    title: "Restaurant",
  },
  {
    id: "contact", 
    title: "Contact",
  },
  {
    id: "profile", 
    title: "Profile",
  },
];

const Navbar = () => {
  const [active, setActive] = useState(" ");
  const [toggle, setToggle] = useState(false);

  return (
<div className="bg-gradient-to-r from-yellow-400 via-orange-600 to-red-400 w-full overflow-hidden">
    <div className="sm:px-16 px-6 flex justify-center items-center">
    <div className="xl:max-w-[1280px] w-full">
    <nav className="w-full flex py-3 justify-between items-center navbar">
      {/* Logo */}
    <Link to="/" className="cursor-pointer">
          <h1 className="text-3xl text-white">Eat Ease </h1>
      {/* <img
        src={logo}
        alt="menu"
        className="w-[28px] h-[28px] object-contain"
      /> */}
    </Link>

      
     {/* Desktop Navigation */}
<ul className="list-none sm:flex hidden justify-end items-center flex-1">
  {navLinks.map((nav, index) => (
    <li
      key={nav.id}
      className={`font-poppins font-normal cursor-pointer text-[16px] ${
        active === nav.title ? 'text-white' : 'text-red-500'
      } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
    >
<Link
  to={`/${nav.id}`}
  className={`  ${active === nav.title ? 'text-white' : 'text-black'}   font-medium text-[18px]`}
  onClick={() => setActive(nav.title)}
>
  {nav.title}
</Link>
    </li>
  ))}
</ul>

{/* Mobile Navigation */}
<div className="sm:hidden flex flex-1 justify-end items-center">
  <img
    src={toggle ? close : menu}
    alt="menu"
    className="w-[28px] h-[28px] object-contain"
    onClick={() => setToggle(!toggle)}
  />

  {/* Sidebar */}
  <div
    className={`${
      !toggle ? 'hidden' : 'flex'
    } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
  >
    <ul className="list-none bg-red-800 flex justify-end items-start flex-1 flex-col">
      {navLinks.map((nav, index) => (
        <li
          key={nav.id}
          className={`font-poppins font-medium cursor-pointer text-[16px] ${
            active === nav.title ? 'text-white' : 'text-dimWhite'
          } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
        >
          <Link to={`/${nav.id}`} className="text-white">{nav.title}</Link>
        </li>
      ))}
    </ul>
  </div>
</div>

    </nav>
    </div>
    </div>
    </div>
  );
};

export default Navbar;
