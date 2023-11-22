import { useState } from "react";
import close from "../assets/navbar/close.png";
import logo2 from "../assets/navbar/logo2.png";
import menu from "../assets/navbar/menu.png";
import { Link } from 'react-router-dom';
import './navbar.css';

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
    id: "restaurants",
    title: "Restaurants",
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
// ... (imports and other code)

const Navbar = () => {
  const [active, setActive] = useState(" ");
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="bg-transparent w-full overflow-hidden">
      <div className="sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <nav className="w-full flex py-2 justify-between items-center navbar">
            {/* Logo */}
            <Link to="/" className="cursor-pointer">
              <img
                src={logo2}
                alt="menu"
                className="w-[200px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-normal cursor-pointer ${
                    active === nav.title ? 'text-white' : 'text-red-500'
                  } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
                >
                  <Link
                    to={`/${nav.id}`}
                    className={`text-[18px] font-medium ${
                      active === nav.title ? 'text-white' : 'text-black'
                    } btn-3d`}
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
                onClick={handleToggle}
              />

              {/* Sidebar */}
              <div
                className={`${
                  toggle ? 'flex' : 'hidden'
                } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col">
                  {navLinks.map((nav, index) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.title ? 'text-white' : 'text-dimWhite'
                      } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                    >
                      <Link
                        to={`/${nav.id}`}
                        className={`text-[16px] ${
                          active === nav.title ? 'text-white' : 'text-dimWhite'
                        } btn-3d-mobile`}
                        onClick={() => {
                          setToggle(false);
                          setActive(nav.title);
                        }}
                      >
                        {nav.title}
                      </Link>
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
