import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success('Product deleted successfully!');
    } else {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', message);
    }
  };

  const handleUpdateProduct = async () => {
    const { name, price, image } = formData;
    if (!name || !price || !image) {
      toast.error('Please fill in all fields');
      return;
    }
    const { success, message } = await updateProduct(product._id, formData);
    if (success) {
      toast.success('Product updated successfully!');
      setIsEditing(false);
    } else {
      toast.error(`Failed to update product: ${message}`);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 flex flex-col cursor-pointer justify-between transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-80 h-48 object-fill rounded"
        />

        <div className="mt-4">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-300 font-bold mt-1">${product.price}</p>
        </div>
        <div className="space-x-2 mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit size={18} />
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded cursor-pointer
            "
            onClick={() => handleDeleteProduct(product._id)}
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-90 z-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-white"
              onClick={() => setIsEditing(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 mb-5 rounded bg-gray-700 text-white"
            />

            <div className="flex justify-end space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleUpdateProduct}
              >
                Update
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
