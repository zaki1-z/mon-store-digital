import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dsgrbhofkappxpuimkg.supabase.co';
const supabaseKey = 'sb_publishable_HuoDWYkQYegythDbrvV1gw_dBc0rkCy';
const supabase = createClient(supabaseUrl, supabaseKey);

// Catalogue des produits digitaux et solutions RichTech Maroc (Licences, IPTV, etc.)
const defaultDigitalProducts = [
  {
    id: 'lic-1',
    title: 'Licence Windows 11 Pro (À vie)',
    description: 'Activation officielle et définitive pour 1 PC. Mises à jour incluses.',
    price: 15,
    category: 'Logiciel'
  },
  {
    id: 'lic-2',
    title: 'Microsoft Office 2021 Pro Plus',
    description: 'Word, Excel, PowerPoint, Outlook, Access. Clé officielle liée à votre compte.',
    price: 25,
    category: 'Bureautique'
  },
  {
    id: 'lic-3',
    title: 'Antivirus Kaspersky Total Security',
    description: 'Protection maximale contre les malwares et ransomwares pour 1 an / 1 Appareil.',
    price: 20,
    category: 'Cybersécurité'
  },
  {
    id: 'iptv-1',
    title: 'Abonnement IPTV Premium (12 Mois)',
    description: 'Plus de 40 000 chaînes en HD/4K, films et séries mis à jour quotidiennement. Anti-coupure.',
    price: 45,
    category: 'Streaming IPTV'
  },
  {
    id: 'cctv-1',
    title: 'Kit Caméras de Surveillance CCTV Pro',
    description: 'Installation et configuration de caméras HD avec vision nocturne et accès smartphone à distance.',
    price: 120,
    category: 'Sécurité & Matériel'
  }
];

export default function App() {
  const [products, setProducts] = useState(defaultDigitalProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatabaseProducts();
  }, []);

  async function fetchDatabaseProducts() {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data && data.length > 0) {
        // Si la base contient des produits, on les fusionne ou les affiche
        setProducts([...data, ...defaultDigitalProducts]);
      }
    } catch (err) {
      console.log('Utilisation du catalogue par défaut RichTech');
    }
    setLoading(false);
  }

  const handleWhatsAppOrder = (productTitle, productPrice) => {
    const message = encodeURIComponent(`Bonjour RichTech Maroc 👋, je suis intéressé par ce produit :\n\n📌 *${productTitle}*\n💰 Prix : $${productPrice}\n\nMerci de me donner les instructions pour finaliser la commande.`);
    window.open(`https://wa.me/message/OHTL6X7NT4P7C1?text=${message}`, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#030712',
      color: '#f9fafb',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      padding: '40px 20px',
      overflowX: 'hidden'
    }}>
      {/* En-tête / Logo et Branding RichTech Maroc */}
      <header style={{ maxWidth: '1100px', margin: '0 auto 60px auto', textAlign: 'center' }}>
        
        {/* Logo visuel inspiré de votre profil */}
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '24px',
          padding: '24px 40px',
          boxShadow: '0 20px 40px -15px rgba(56, 189, 248, 0.15)',
          marginBottom: '30px'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', letterSpacing: '1px', margin: '0 0 8px 0', color: '#ffffff' }}>
            RichTech <span style={{ color: '#38bdf8' }}>MAROC</span>
          </h2>
          <div style={{ display: 'flex', gap: '15px', fontSize: '1.3rem', color: '#38bdf8', marginTop: '5px' }}>
            <span>🎥 CCTV</span>
            <span>⌨️ IT</span>
            <span>📱 Mobile</span>
            <span>📺 IPTV</span>
          </div>
        </div>

        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '0 0 15px 0', background: 'linear-gradient(to right, #60a5fa, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Solutions Numériques & Licences Officielles
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
          Votre partenaire de confiance au Maroc pour le matériel informatique, la sécurité, les abonnements IPTV et les licences logicielles garanties.
        </p>

        {/* Boutons de Réseaux Sociaux & WhatsApp Business */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/richtechmaroc" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#db2777', '#f43f5e')}>
            📸 Instagram RichTech
          </a>
          <a href="https://www.facebook.com/share/1AAqXciBiU/" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#2563eb', '#3b82f6')}>
            📘 Facebook Officiel
          </a>
          <a href="https://wa.me/message/OHTL6X7NT4P7C1" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#16a34a', '#22c55e')}>
            💬 WhatsApp Business Direct
          </a>
        </div>
      </header>

      {/* Grille des Produits */}
      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#f3f4f6' }}>
            ⚡ Catalogue & Licences Disponibles
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            Activation Instantanée 🚀
          </span>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', padding: '50px' }}>Chargement des solutions...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
            {products.map((product) => (
              <div key={product.id} style={{
                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(56, 189, 248, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = '0 15px 35px -10px rgba(0, 0, 0, 0.5)';
              }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                    {product.category || 'Solution Pro'}
                  </span>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: '700', margin: '14px 0 10px 0', color: '#ffffff' }}>
                    {product.title}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                    {product.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#34d399' }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => handleWhatsAppOrder(product.title, product.price)}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Commander via WhatsApp 💬
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '90px', color: '#64748b', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '25px' }}>
        <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontWeight: '500' }}>RichTech Maroc • Solutions Informatiques & Sécurité</p>
        <p style={{ margin: 0 }}>© 2026 Tous droits réservés.</p>
      </footer>
    </div>
  );
}

function socialBtnStyle(color1, color2) {
  return {
    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    color: '#fff',
    padding: '11px 22px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '0.92rem',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
  };
}
