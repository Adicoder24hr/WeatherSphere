import { Link } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-black/70 backdrop-blur-xl border-t border-white/10 py-6 animate-slide-down">
      <div className="flex flex-col items-center gap-6 text-lg font-medium">
        <Link 
          to="/" 
          onClick={onClose}
          className="hover:text-teal-400 transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          to="/historical" 
          onClick={onClose}
          className="hover:text-teal-400 transition-colors"
        >
          Historical Trends
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;