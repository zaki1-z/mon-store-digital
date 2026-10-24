import React, { useState, useEffect } from 'react';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ_-scpc4pIJ2pgy_yIHrCeNWm07SaS6XkH2Fysf9JIoE1BGq-WYh5-0yyCu8YyFt89WjDdhzL5CI_/pub?gid=0&single=true&output=csv';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Navigation entre les pages: 'home', 'catalog', 'services'
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('TOUS');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clientNom, setClientNom] = useState('');
  const [clientPrenom, setClientPrenom] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const servicesList = [
    {
      id: 1,
      title: "Installation Réseaux & Câblage",
      desc: "Configuration de routeurs, switches, points d'accès Wi-Fi et câblage structuré pour entreprises, bureaux et résidences.",
      icon: "🌐",
      badge: "Sur Devis"
    },
    {
      id: 2,
      title: "Installation Caméras de Surveillance",
      desc: "Pose et configuration de systèmes de vidéosurveillance (IP & analogique) avec vision nocturne et accès direct sur votre smartphone.",
      icon: "🎥",
      badge: "Clé en main"
    },
    {
      id: 3,
      title: "Maintenance Informatique & Matériel",
      desc: "Diagnostic, réparation de cartes mères (micro-soudure), optimisation PC/PC portables et nettoyage de systèmes informatiques.",
      icon: "🛠️",
      badge: "Diagnostic pro"
    }
  ];

  const testimonials = [
    { id: 1, name: "Youssef B.", city: "Casablanca", comment: "Service rapide et fiable ! J'ai reçu ma licence Windows 11 en moins de 10 minutes sur WhatsApp. Top.", rating: 5 },
    { id: 2, name: "Mehdi K.", city: "Rabat", comment: "Pack caméras Dahua top qualité, vision nocturne claire et installation facile. Merci RichTech !", rating: 5 },
    { id: 3, name: "Amine T.", city: "Marrakech", comment: "Abonnement IPTV T-REX stable sans coupure pendant les match. Je recommande vivement.", rating: 5 }
  ];

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const lines = [];
        let currentRow = '';
        let insideQuotes = false;

        for (let i = 0; i < csvText.length; i++) {
          const char = csvText[i];
          if (char === '"') {
            insideQuotes = !insideQuotes;
            currentRow += char;
          } else if ((char === '\n' || char === '\r') && !insideQuotes) {
            if (currentRow.trim() !== '') {
              lines.push(currentRow);
            }
            currentRow = '';
          } else {
            currentRow += char;
          }
        }
        if (currentRow.trim() !== '') {
          lines.push(currentRow);
        }

        const parsedProducts = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
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

          const cleanRow = row.map(val => val.replace(/^["'](.+)["']$/, '$1').trim());

          if (cleanRow.length >= 5 && cleanRow[1]) {
            parsedProducts.push({
              id: cleanRow[0] || i.toString(),
              title: cleanRow[1] || '',
              category: cleanRow[2] || 'Solution Pro',
              description: cleanRow[3] || 'Solution professionnelle certifiée RichTech Maroc.',
              price: Number(cleanRow[4]) || 0,
              image_url: cleanRow[5] || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
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
      {/* Modal Commande WhatsApp */}
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
                background: '#16a34a', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px',
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

      {/* Header Principal avec Navbar */}
      <header style={{ maxWidth: '1350px', margin: '0 auto 40px auto', textAlign: 'center', background: '#ffffff', borderRadius: '24px', padding: '40px 30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <div style={{
          width: '110px', height: '110px', margin: '0 auto 15px auto',
          background: '#f1f5f9', borderRadius: '50%', display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          border: '3px solid #0f172a', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', padding: '10px'
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '900', margin: '0 0 2px 0', color: '#0f172a', lineHeight: '1.1' }}>
            RichTech
          </h2>
          <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '2px', color: '#0f172a', marginBottom: '6px' }}>
            MAROC
          </span>
          <div style={{ display: 'flex', gap: '3px', fontSize: '0.7rem' }}>
            <span>🎥</span><span>⌨️</span><span>📱</span><span>📺</span>
          </div>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>
          RichTech Maroc
        </h1>
        <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 25px auto', lineHeight: '1.5' }}>
          La technologie au service de votre avenir. Informatique, caméras de surveillance, réseaux, IPTV et licences officielles.
        </p>

        {/* Navbar Principale */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setCurrentPage('home')}
            style={navBtnStyle(currentPage === 'home')}
          >
            🏠 Accueil
          </button>
          <button 
            onClick={() => { setCurrentPage('catalog'); setActiveCategory('TOUS'); }}
            style={navBtnStyle(currentPage === 'catalog')}
          >
            🛍️ Catalogue & Produits
          </button>
          <button 
            onClick={() => setCurrentPage('services')}
            style={navBtnStyle(currentPage === 'services')}
          >
            🛠️ Nos Services
          </button>
        </nav>
      </header>

      {/* Contenu dynamique selon la page active */}
      <main style={{ maxWidth: '1350px', margin: '0 auto' }}>

        {/* 1. PAGE ACCUEIL */}
        {currentPage === 'home' && (
          <div>
            {/* Bannière de Bienvenue */}
            <div style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff', borderRadius: '24px', padding: '50px 40px', textAlign: 'center',
              marginBottom: '50px', boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1)'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '15px' }}>Bienvenue chez RichTech Maroc 🚀</h2>
              <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
                Votre partenaire de confiance pour toutes vos solutions informatiques, abonnements IPTV, licences officielles et installations de sécurité.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <button onClick={() => { setCurrentPage('catalog'); setActiveCategory('TOUS'); }} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
                  Voir le Catalogue 🛍️
                </button>
                <button onClick={() => setCurrentPage('services')} style={{ background: 'transparent', color: '#fff', border: '2px solid #cbd5e1', padding: '12px 25px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
                  Découvrir nos Services 🛠️
                </button>
              </div>
            </div>

            {/* Aperçu Produits Populaires */}
            {!loading && popularProducts.length > 0 && (
              <div style={{ marginBottom: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#0f172a' }}>
                    🔥 Produits Populaires & Recommandés
                  </h3>
                  <button onClick={() => { setCurrentPage('catalog'); setActiveCategory('TOUS'); }} style={{ background: 'transparent', border: 'none', color: '#0284c7', fontWeight: '700', cursor: 'pointer' }}>
                    Voir tout →
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                  {popularProducts.map((product) => (
                    <div key={`pop-${product.id}`} style={{
                      background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '26px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
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
                        <h4 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '12px 0 8px 0', color: '#0f172a' }}>{product.title}</h4>
                        <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: '0 0 20px 0', whiteSpace: 'pre-line' }}>{product.description}</p>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '1.7rem', fontWeight: '800', color: '#16a34a' }}>{product.price} DH</span>
                        </div>
                        <button onClick={() => setSelectedProduct(product)} style={{
                          width: '100%', background: '#0f172a', color: '#fff', border: 'none', padding: '13px',
                          borderRadius: '10px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                        }}>
                          Acheter 🛒
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Avis Clients */}
            <div style={{ marginBottom: '60px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '10px', color: '#0f172a' }}>
                ⭐ Ce que disent nos clients au Maroc
              </h3>
              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem', marginBottom: '35px' }}>
                La satisfaction de nos clients est notre priorité absolue.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {testimonials.map((t) => (
                  <div key={t.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '10px' }}>★★★★★</div>
                      <p style={{ color: '#334155', fontSize: '0.92rem', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '15px' }}>"{t.comment}"</p>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>{t.name}</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '6px' }}>{t.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PAGE CATALOGUE & PRODUITS */}
        {currentPage === 'catalog' && (
          <div>
            {/* Filtres par catégories */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '35px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? '#0f172a' : '#ffffff',
                    color: activeCategory === cat ? '#ffffff' : '#475569',
                    border: '1px solid #cbd5e1', padding: '10px 22px', borderRadius: '30px',
                    fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

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
                    background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '26px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
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
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '12px 0 8px 0', color: '#0f172a' }}>{product.title}</h4>
                      <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.5', margin: '0 0 20px 0', whiteSpace: 'pre-line' }}>{product.description}</p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '1.7rem', fontWeight: '800', color: '#16a34a' }}>{product.price} DH</span>
                      </div>
                      <button onClick={() => setSelectedProduct(product)} style={{
                        width: '100%', background: '#0f172a', color: '#fff', border: 'none', padding: '13px',
                        borderRadius: '10px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                      }}>
                        Acheter 🛒
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. PAGE NOS SERVICES */}
        {currentPage === 'services' && (
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', textAlign: 'center', marginBottom: '10px', color: '#0f172a' }}>
              🛠️ Nos Prestations & Services Techniques
            </h3>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem', marginBottom: '40px' }}>
              Interventions professionnelles sur terrain pour particuliers et entreprises au Maroc.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              {servicesList.map((srv) => (
                <div key={srv.id} style={{
                  background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '35px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <span style={{ fontSize: '2.8rem' }}>{srv.icon}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)', padding: '6px 14px', borderRadius: '20px' }}>
                        {srv.badge}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>{srv.title}</h4>
                    <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>{srv.desc}</p>
                  </div>

                  <a 
                    href={`https://wa.me/212602784528?text=${encodeURIComponent(`Bonjour RichTech Maroc, je suis intéressé par votre service : ${srv.title}`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      background: '#0f172a', color: '#fff', textAlign: 'center', padding: '14px',
                      borderRadius: '10px', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                    }}
                  >
                    Demander un devis 💬
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
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
function navBtnStyle(isActive) {
  return {
    background: isActive ? '#0f172a' : '#f1f5f9',
    color: isActive ? '#ffffff' : '#475569',
    border: '1px solid #cbd5e1', padding: '10px 24px', borderRadius: '30px',
    fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
    boxShadow: isActive ? '0 4px 12px rgba(15, 23, 42, 0.2)' : 'none',
    transition: 'all 0.2s ease'
  };
}
function socialBtnStyle(color1, color2) {
  return {
    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    color: '#fff', padding: '11px 22px', borderRadius: '12px',
    textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  };
}
