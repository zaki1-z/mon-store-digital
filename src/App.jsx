import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dsgrbhofkappxpuimkg.supabase.co';
const supabaseKey = 'sb_publishable_HuoDWYkQYegythDbrvV1gw_dBc0r...'; // Mets ta clé complète ici
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        setErrorMessage(error.message);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #090d16 0%, #111827 100%)',
      color: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '50px 20px'
    }}>
      <header style={{ maxWidth: '900px', margin: '0 auto 60px auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', borderRadius: '50px', fontSize: '13px', fontWeight: '600', marginBottom: '15px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          🔒 NexusDigital • Ressources Tech & Cybersécurité
        </div>
        <h1 style={{ fontSize: '3.2rem', fontWeight: '800', margin: '0 0 15px 0', background: 'linear-gradient(to right, #38bdf8, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NexusDigital
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.15rem', margin: 0 }}>
          La marketplace de référence pour les professionnels de l'IT et du réseau.
        </p>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>Connexion à la base de données...</p>
        ) : errorMessage ? (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '20px', borderRadius: '12px', color: '#fca5a5', textAlign: 'center' }}>
            <p style={{ fontWeight: '700', margin: '0 0 8px 0' }}>Erreur de connexion Supabase :</p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{errorMessage}</p>
          </div>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>Aucun produit trouvé dans la base de données.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {products.map((product) => (
              <div key={product.id} style={{
                background: 'rgba(17, 24, 39, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '700', margin: '0 0 12px 0', color: '#fff' }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                    {product.description || "Aucune description fournie."}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#34d399' }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => alert(`Achat de : ${product.title}`)}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 22px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Acquérir ⚡
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
