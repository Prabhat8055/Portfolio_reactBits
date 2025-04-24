import CircularText from "../ReactBits/CircularText";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import Scrollspy from "react-scrollspy";

const NavLinks = ({ closeMenu }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="flex flex-col md:flex-row gap-7 text-white text-[1.2rem] font-[lato-200]">
      {isHome ? (
        <Scrollspy
          items={["home", "about", "projects", "contact", "myjourney"]}
          currentClassName="active"
          className="flex flex-col md:flex-row gap-7"
          offset={-100}
          componentTag="ul"
        >
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={closeMenu}
          >
            <a href="#home">Home</a>
          </li>
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={closeMenu}
          >
            <a href="#about">About</a>
          </li>
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={closeMenu}
          >
            <a href="#projects">Projects</a>
          </li>
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={closeMenu}
          >
            <a href="#contact">Contact</a>
          </li>
        </Scrollspy>
      ) : (
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
      )}
      <Link to="/myjourny" onClick={closeMenu}>
        More
      </Link>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between "
      style={{ padding: "20px" }}
    >
      {/* Left - CircularText */}
      <div className="flex items-center">
        <a href="/">
          <CircularText
            text="PRABHAT'S * PORTFOLIO * REACTBITS *"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </a>
      </div>

      {/* Middle - Desktop Nav */}
      <nav className="hidden md:flex">
        <NavLinks closeMenu={() => setIsOpen(false)} />
      </nav>

      {/* Right - Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={toggleNavbar} className="text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav - Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full backdrop-blur-xl  rounded-b-2xl shadow-xl flex flex-col items-center py-6 space-y-4 transition-all duration-300 ease-in-out z-50"
            style={{ padding: "10px" }}
          >
            <NavLinks closeMenu={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
