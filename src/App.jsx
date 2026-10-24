import React, { useState, useEffect } from 'react';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ_-scpc4pIJ2pgy_yIHrCeNWm07SaS6XkH2Fysf9JIoE1BGq-WYh5-0yyCu8YyFt89WjDdhzL5CI_/pub?gid=0&single=true&output=csv';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('TOUS');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clientNom, setClientNom] = useState('');
  const [clientPrenom, setClientPrenom] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const lines = csvText.split('\n');
        const parsedProducts = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const row = [];
          let inQuotes = false;
          let currentVal = '';
          
          for (let char of line) {
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              row.push(currentVal.trim());
              currentVal = '';
            } else {
              currentVal += char;
            }
          }
          row.push(currentVal.trim());

          if (row.length >= 2 && row[1]) {
            parsedProducts.push({
              id: row[0] || i.toString(),
              title: row[1] || '',
              category: (row[2] && typeof row[2] === 'string') ? row[2].trim() : 'Solution Pro',
              description: row[3] || 'Solution professionnelle certifiée RichTech Maroc.',
              price: Number(row[4]) || 0,
              image_url: row[5] || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
            });
          }
        }

        setProducts(parsedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lecture Google Sheets :', err);
        setLoading(false);
      });
  }, []);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!clientNom || !clientPrenom || !clientEmail || !clientPhone) {
      return alert("Veuillez remplir tous les champs du formulaire.");
    }

    const whatsappNumber = "212602784528"; 

    const textMessage = encodeURIComponent(
      `NOUVELLE COMMANDE - RichTech Maroc\n\n` +
      `Produit : ${selectedProduct.title}\n` +
      `Prix : ${selectedProduct.price} DH\n\n` +
      `Nom : ${clientNom} ${clientPrenom}\n` +
      `E-mail : ${clientEmail}\n` +
      `Téléphone : ${clientPhone}\n\n` +
      `Merci de valider ma commande !`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${textMessage}`, '_blank');

    setSelectedProduct(null);
    setClientNom('');
    setClientPrenom('');
    setClientEmail('');
    setClientPhone('');
  };

  const categories = ['TOUS', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = activeCategory === 'TOUS' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const popularProducts = products.slice(0, 3);

  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc', color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif', padding: '30px 40px', overflowX: 'hidden'
    }}>
      {selectedProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            background: '#ffffff', border: '1px solid #e2e8f0',
            borderRadius: '20px', padding: '30px', width: '100%', maxWidth: '450px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '1.4rem' }}>🛒 Valider votre commande</h3>
            <p style={{ color: '#0284c7', fontSize: '0.95rem', marginBottom: '20px' }}>
              Produit : <strong>{selectedProduct.title}</strong> ({selectedProduct.price} DH)
            </p>

            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Nom" value={clientNom} onChange={e => setClientNom(e.target.value)} style={inputStyleLight} required />
              <input type="text" placeholder="Prénom" value={clientPrenom} onChange={e => setClientPrenom(e.target.value)} style={inputStyleLight} required />
              <input type="email" placeholder="Adresse e-mail" value={clientEmail} onChange={e => setClientEmail(e.target.value)} style={inputStyleLight} required />
              <input type="tel" placeholder="Numéro de téléphone" value={clientPhone} onChange={e => setClientPhone(e.target.value)} style={inputStyleLight} required />

              <button type="submit" style={{
                background: '#16a34a',
                color: '#fff', border: 'none', padding: '14px', borderRadius: '10px',
                fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '10px',
                boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)'
              }}>
                Envoyer la commande sur WhatsApp 🚀
              </button>
            </form>

            <button onClick={() => setSelectedProduct(null)} style={{
              background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer',
              marginTop: '15px', width: '100%', textAlign: 'center', fontSize: '0.9rem'
            }}>
              Annuler ✕
            </button>
          </div>
        </div>
      )}

      <header style={{ maxWidth: '1350px', margin: '0 auto 40px auto', textAlign: 'center', background: '#ffffff', borderRadius: '24px', padding: '45px 30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <div style={{
          width: '130px', height: '130px', margin: '0 auto 20px auto',
          background: '#f1f5f9', borderRadius: '50%', display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          border: '3px solid #0f172a', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', padding: '10px'
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '900', margin: '0 0 4px 0', color: '#0f172a', lineHeight: '1.1' }}>
            RichTech
          </h2>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '2px', color: '#0f172a', marginBottom: '8px' }}>
            MAROC
          </span>
          <div style={{ display: 'flex', gap: '4px', fontSize: '0.75rem' }}>
            <span>🎥</span><span>⌨️</span><span>📱</span><span>📺</span>
          </div>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 10px 0', color: '#0f172a' }}>
          RichTech Maroc
        </h1>
        <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.5' }}>
          La technologie au service de votre avenir. Informatique, caméras de surveillance, réseaux, IPTV et licences officielles.
        </p>

        {/* Barre de navigation des catégories */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '30px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#0f172a' : '#f1f5f9',
                color: activeCategory === cat ? '#ffffff' : '#475569',
                border: '1px solid #cbd5e1',
                padding: '10px 22px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(15, 23, 42, 0.2)' : 'none'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: '1350px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#0f172a', textTransform: 'uppercase' }}>
            ⚡ Catalogue : {activeCategory}
          </h3>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>Chargement du catalogue...</p>
        ) : filteredProducts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>Aucun produit disponible dans cette catégorie.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px', marginBottom: '60px' }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px', padding: '26px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div>
                  {product.image_url && (
                    <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', background: '#f1f5f9' }}>
                      <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                    {product.category}
                  </span>
                  
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '12px 0 8px 0', color: '#0f172a' }}>
                    {product.title}
                  </h4>
                  
                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                    {product.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.7rem', fontWeight: '800', color: '#16a34a' }}>
                      {product.price} DH
                    </span>
                  </div>

                  <button onClick={() => setSelectedProduct(product)} style={{
                    width: '100%', background: '#0f172a',
                    color: '#fff', border: 'none', padding: '13px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                  }}>
                    Acheter 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section Suggestions / Produits Populaires */}
        {!loading && popularProducts.length > 0 && (
          <div style={{ marginTop: '80px', borderTop: '2px solid #e2e8f0', paddingTop: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: '0 0 25px 0', color: '#0f172a' }}>
              🔥 Produits Populaires & Recommandés
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
              {popularProducts.map((product) => (
                <div key={`pop-${product.id}`} style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '20px', padding: '26px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                  <div>
                    {product.image_url && (
                      <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', background: '#f1f5f9' }}>
                        <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#16a34a', background: 'rgba(22, 163, 74, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                      Populaire ⭐
                    </span>
                    
                    <h4 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '12px 0 8px 0', color: '#0f172a' }}>
                      {product.title}
                    </h4>
                    
                    <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '1.7rem', fontWeight: '800', color: '#16a34a' }}>
                        {product.price} DH
                      </span>
                    </div>

                    <button onClick={() => setSelectedProduct(product)} style={{
                      width: '100%', background: '#0f172a',
                      color: '#fff', border: 'none', padding: '13px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                    }}>
                      Acheter 🛒
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer style={{
        maxWidth: '1350px', margin: '80px auto 0 auto', background: '#ffffff',
        border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px 30px',
        textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
          RichTech Maroc • Solutions Informatiques & Sécurité
        </h4>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' }}>
          Contactez-nous directement sur nos réseaux officiels :
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
          <a href="https://www.instagram.com/richtechmaroc" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#db2777', '#f43f5e')}>📸 Instagram</a>
          <a href="https://www.facebook.com/share/1AAqXciBiU/" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#2563eb', '#3b82f6')}>📘 Facebook</a>
          <a href="https://wa.me/212602784528" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#16a34a', '#22c55e')}>💬 WhatsApp</a>
        </div>

        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>© 2026 RichTech Maroc. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

const inputStyleLight = { background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px', color: '#0f172a', fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box' };
function socialBtnStyle(color1, color2) {
  return {
    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    color: '#fff', padding: '11px 22px', borderRadius: '12px',
    textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  };
}
