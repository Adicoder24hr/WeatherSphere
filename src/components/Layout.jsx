import { useState } from "react";
import Navbar from "./navigation/Navbar";
import MobileMenu from "./navigation/MobileMenu";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;