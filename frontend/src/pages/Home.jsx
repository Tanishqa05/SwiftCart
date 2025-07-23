import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/productCard';

const Home = () => {
 const { fetchProducts, products } = useProductStore();

 useEffect(() => {
   fetchProducts();
 }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center " >
      <h3 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-300 mb-7'>
        Current Products 🚀</h3>
     
      {products.length === 0 ? (
        
        <span className="text-lg font-bold mt-5 mb-96">No products Found 😔 
      <Link to="/create" className="text-blue-500 hover:underline font-bold ">   Create a new product!</Link>
    </span> 
      ):(

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
         )}

    </div>
  )
}

export default Home
