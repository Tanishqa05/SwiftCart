import { FaShoppingCart, FaPlus } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      {/* Left: Logo and Cart */}
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          <Link to="/">SWIFT CART</Link>
        </h1>
        <FaShoppingCart className="text-blue-400 w-9 h-7" />
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <Link to="/create">
  <button className="bg-gray-800 p-2 rounded text-white hover:bg-gray-700 cursor-pointer">
    <FaPlus />
  </button>
</Link>
        <button className="bg-gray-800 p-2 rounded">
          <BsSunFill />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
