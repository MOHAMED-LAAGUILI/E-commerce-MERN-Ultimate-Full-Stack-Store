import { useEffect, useRef, useState } from "react";
import { FaSearch, FaUserAlt, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Typed from "typed.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);

  const inputRef = useRef(null);
  const typedRef = useRef(null);

  // Typed.js setup
  useEffect(() => {
    const options = {
      strings: ["Search for products...", "Search for brands...", "Search for categories..."],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: false,
    };

    if (inputRef.current) {
      typedRef.current = new Typed(inputRef.current, options);
    }

    return () => typedRef.current?.destroy();
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Start and stop Typed.js when input focus/blur
  const handleFocus = () => {
    typedRef.current?.stop();
  };

  const handleBlur = () => {
    typedRef.current?.start();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Offers", path: "/offers" },
    { name: "Orders", path: "/orders" },
    { name: "Support", path: "/support" },
  ];

  const renderNavLinks = (extraClasses = "") =>
    navLinks.map(({ name, path }) => (
      <li key={name} className={`font-bold hover:bg-accent-100 px-3 py-3 rounded-[10px] ${extraClasses} hover:text-white transition-all duration-300`}>
        <Link to={path}>{name}</Link>
      </li>
    ));

  return (
    <header className="bg-gray-200 shadow-lg sticky top-0 z-50 transition-all backdrop-blur-md bg-opacity-30">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <img
          src={"https://res.cloudinary.com/djmafhmnw/image/upload/v1732037034/i-shop/ysniwxhyk1mpxbunaalu.png"}
          alt="iShop"
          width={80}
          height={80}
          className="bg-text-dark rounded-full border p-1 shadow-lg transition-transform"
        />

        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-1/2">
          {toggleInput ? (
            <>
              <input
                type="text"
                ref={inputRef}
                className="w-full bg-transparent placeholder-neutral-300 text-white outline-none px-4"
                placeholder="Search for products..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={() => setToggleInput(true)}
                onMouseLeave={() => setToggleInput(false)}
              />
              <button className="bg-accent-100 text-black p-2 rounded-full hover:bg-primary-100 transition duration-300">
                <FaSearch />
              </button>
            </>
          ) : (
            <>
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent placeholder-neutral-300 text-white outline-none px-4"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={() => setToggleInput(true)} // Set the state to show the search input
                onMouseEnter={() => setToggleInput(true)} // Ensure the input is shown on hover
                onMouseLeave={() => setToggleInput(false)} // Hide the input when mouse leaves
              />
              <button className="bg-accent-100 text-black p-2 rounded-full hover:bg-primary-100 transition duration-300">
                <FaSearch />
              </button>
            </>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-accent-100 hover:text-gray-400 transition-colors">
            <FaUserAlt size={25} />
          </Link>
          <button className="relative text-accent-100 hover:text-gray-400 transition-colors">
            <FaShoppingCart size={30} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-sm w-5 h-5 flex items-center justify-center">4</span>
          </button>
          <button
            className="md:hidden text-white hover:text-gray-400 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`md:hidden bg-gray-900 text-white overflow-hidden transition-all ${isMenuOpen ? "max-h-64" : "max-h-0"}`}>
        <ul className="flex flex-col items-center space-y-4 p-4">{renderNavLinks("w-full text-center")}</ul>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gray-300 backdrop-blur-md bg-opacity-30">
        <ul className="flex justify-center space-x-6 p-4">{renderNavLinks()}</ul>
      </nav>
    </header>
  );
};

export default Header;
