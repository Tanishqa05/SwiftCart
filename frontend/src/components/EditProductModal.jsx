// components/EditProductModal.jsx

import React, { useState } from 'react';
import { useProductStore } from '../store/product';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

const EditProductModal = ({ product, onClose }) => {
  const { updateProduct } = useProductStore();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { name, price, image } = formData;
    if (!name || !price || !image) {
      toast.error('Please fill in all fields');
      return;
    }

    const { success, message } = await updateProduct(product._id, formData);
    if (success) {
      toast.success('Product updated successfully!');
      onClose();
    } else {
      toast.error(`Failed to update product: ${message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center   z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-3 right-3 text-white" onClick={onClose}>
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
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
