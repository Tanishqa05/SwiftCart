import { FaShoppingCart, FaPlus } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

const Navbar = () => {

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      {/* Left: Logo and Cart */}
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          QUICK CART
        </h1>
        <FaShoppingCart className="text-blue-400 w-5 h-5" />
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <button className="bg-gray-800 p-2 rounded">
          <FaPlus />
        </button>
        <button className="bg-gray-800 p-2 rounded">
          <BsSunFill />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
