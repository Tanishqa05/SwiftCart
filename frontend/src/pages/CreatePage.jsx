import React, { useState } from 'react';
import { useProductStore } from '../store/product';
import toast from 'react-hot-toast';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });
  
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  
  const { createProduct } = useProductStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {success} = await createProduct(newProduct);

    if (success) {
      toast.success('Product created successfully!');
      console.log('Product added:', newProduct);
      setNewProduct({ name: '', price: '', image: '' }); // Clear form
    } else {
      console.error('Error creating product:', message);
      toast.error('Failed to create product');
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Product added:', newProduct);
  //   // clear form
  //   setNewProduct({ name: '', price: '', image: '' });
  // };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl font-bold mb-10">Create New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 mb-30 "
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-400 text-black font-semibold py-2 rounded hover:bg-blue-500 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
