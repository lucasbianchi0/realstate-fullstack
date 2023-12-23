import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { HiMenu } from 'react-icons/hi';
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [menuOpen]);

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-white font-bold text-xl">INMSA</div>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link className="text-white" to={'/'}>Properties</Link>
        <Link className="text-white" to={'/'}>Contact</Link>
        <Link className="text-white" to={'/account'}>Account</Link>
      </div>
      <div className="md:hidden">
        {menuOpen ? (
          <button className="text-white bg-transparent" onClick={toggleMenu}>
            <HiMenu size={30}/>
          </button>
        ) : (
          <button className="text-white bg-transparent" onClick={toggleMenu}>
            <HiMenu size={30}/>
          </button>
        )}
      </div>
      {menuOpen && (
        <div className="md:hidden  fixed inset-0 bg-blue-900  flex items-center justify-center z-10">
          <div className="flex flex-col space-y-4">
            <button className="text-white bg-transparent" onClick={toggleMenu}>
              <MdOutlineCancelPresentation size={30}/>
            </button>
            <Link className="text-white" to={'/'}>Properties</Link>
            <Link className="text-white" to={'/'}>Contact</Link>
            <Link className="text-white" to={'/account'}>Account</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
