import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Colle ici ton URL Supabase et ta clé Publishable
const supabaseUrl = 'https://dsgrbhofkappxpxuimkg.supabase.co';
const supabaseKey = 'sb_publishable_HuoDWYkQYegythDbrvV1gw_dBcOrkCy';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Erreur lors du chargement des produits :', error);
    else setProducts(data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Mon Store Digital 🚀
        </h1>
        <p className="text-gray-400">Vos produits numériques de qualité en un clic</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-center col-span-2 text-gray-400">Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p className="text-center col-span-2 text-gray-400">Aucun produit disponible pour le moment.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <span className="text-2xl font-semibold text-green-400">${product.price}</span>
                <button 
                  onClick={() => alert(`Redirection vers le paiement pour : ${product.title}`)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition cursor-pointer"
                >
                  Acheter
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
