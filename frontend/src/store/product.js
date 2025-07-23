import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
  if (!newProduct.name || !newProduct.price || !newProduct.image) {
    console.log(newProduct);
    return { success: false, message: 'All fields are required' };
  }

try {
    
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Server responded with error:', errorText);
    return { success: false, message: 'Server returned error' };
  }

  const data = await res.json();
  console.log('Response:', data);

  set((state) => ({
    products: [...state.products, data.data],
  }));

  return { success: true, message: 'Product created successfully' };
} catch (err) {
  console.error('API Error:', err);
  return { success: false, message: 'API error occurred' };
}

},
    fetchProducts: async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      set({ products: data.data });

    }
}));
