import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dsgrbhofkappxpuimkg.supabase.co';
const supabaseKey = 'sb_publishable_HuoDWYkQYegythDbrvV1gw_dBc0rkCy';
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

  // Fonction pour commander directement via WhatsApp avec le nom du produit
  const handleWhatsAppOrder = (productTitle, productPrice) => {
    const message = encodeURIComponent(`Bonjour RichTech Maroc, je souhaite commander le produit suivant :\n\n📌 *${productTitle}*\n💰 Prix : $${productPrice}\n\nMerci de m'indiquer la procédure de paiement.`);
    window.open(`https://wa.me/message/OHTL6X7NT4P7C1?text=${message}`, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #070b14 0%, #0f172a 100%)',
      color: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '40px 20px'
    }}>
      {/* En-tête / Branding RichTech Maroc */}
      <header style={{ maxWidth: '1000px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', borderRadius: '50px', fontSize: '13px', fontWeight: '600', marginBottom: '15px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          🛠️ Solutions IT, Sécurité & IPTV au Maroc
        </div>
        
        <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 10px 0', color: '#ffffff' }}>
          RichTech <span style={{ color: '#38bdf8' }}>Maroc</span>
        </h1>
        
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '0 auto 25px auto', maxWidth: '600px', lineHeight: '1.5' }}>
          Vente et installation de matériel informatique, caméras de surveillance (CCTV), solutions réseau et IPTV.
        </p>

        {/* Liens de contact rapides (Réseaux Sociaux & WhatsApp) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/richtechmaroc" target="_blank" rel="noopener noreferrer" style={socialButtonStyle}>
            📸 Instagram
          </a>
          <a href="https://www.facebook.com/share/1AAqXciBiU/" target="_blank" rel="noopener noreferrer" style={socialButtonStyle}>
            📘 Facebook
          </a>
          <a href="https://wa.me/message/OHTL6X7NT4P7C1" target="_blank" rel="noopener noreferrer" style={{ ...socialButtonStyle, background: '#16a34a', borderColor: '#22c55e' }}>
            💬 WhatsApp Business
          </a>
        </div>
      </header>

      {/* Catalogue des Produits / Solutions */}
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
          📦 Nos Produits & Solutions Disponibles
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>Chargement du catalogue...</p>
        ) : errorMessage ? (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '20px', borderRadius: '12px', color: '#fca5a5', textAlign: 'center' }}>
            <p style={{ fontWeight: '700', margin: '0 0 8px 0' }}>Erreur de connexion Supabase :</p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{errorMessage}</p>
          </div>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>Aucun produit trouvé dans la base de données pour le moment.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {products.map((product) => (
              <div key={product.id} style={{
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '25px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 10px 0', color: '#fff' }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                    {product.description || "Solution professionnelle certifiée RichTech Maroc."}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '15px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#34d399' }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => handleWhatsAppOrder(product.title, product.price)}
                    style={{
                      background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                    }}
                  >
                    Commander via WhatsApp 💬
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Pied de page */}
      <footer style={{ textAlign: 'center', marginTop: '80px', color: '#64748b', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
        © 2026 RichTech Maroc. Tous droits réservés.
      </footer>
    </div>
  );
}

const socialButtonStyle = {
  background: 'rgba(30, 41, 59, 0.8)',
  color: '#f8fafc',
  padding: '10px 18px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: '600',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.2s',
};
