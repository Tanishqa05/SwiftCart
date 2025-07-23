import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 flex flex-col cursor-pointer justify-between transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-80 h-48 object-fill rounded"
      />
      {/* {console.log(product)} */}

      <div className="mt-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-300 font-bold mt-1">${product.price}</p>
      </div>
      <div className="space-x-2 mt-2">
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
    <FaEdit size={18} />
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
    <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
