import { Link } from "react-router-dom";

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl flex items-center justify-center text-2xl">🌦️</div>
          <h1 className="text-2xl font-bold tracking-tighter">WeatherSphere</h1>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-teal-400 transition-colors">Dashboard</Link>
          <Link to="/historical" className="hover:text-teal-400 transition-colors">Historical Trends</Link>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-3xl focus:outline-none transition-transform"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;