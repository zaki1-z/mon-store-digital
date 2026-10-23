import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dsgrbhofkappxpuimkg.supabase.co';
const supabaseKey = 'sb_publishable_HuoDWYkQYegythDbrvV1gw_dBc0r...'; // Remplace par ta clé complète si besoin
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Erreur :', error);
    else setProducts(data || []);
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100vh, #0f172a 100%)',
      color: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '40px 20px'
    }}>
      <header style={{ maxWidth: '800px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '15px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          ✨ Boutique Digitale Officielle
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 15px 0', background: 'linear-gradient(to right, #60a5fa, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Mon Store Digital 🚀
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
          Découvrez nos ressources professionnelles pour accélérer vos projets.
        </p>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: 'span 2', color: '#94a3b8' }}>Chargement des pépites...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: 'span 2', color: '#94a3b8' }}>Aucun produit pour l'instant.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{
              background: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
            >
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: '0 0 12px 0', color: '#fff' }}>
                  {product.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                  {product.description || "Guide complet et optimisé pour maîtriser le développement moderne."}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#4ade80' }}>
                  ${product.price}
                </span>
                <button 
                  onClick={() => alert(`Redirection vers le paiement sécurisé pour : ${product.title}`)}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Acheter maintenant ⚡
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
