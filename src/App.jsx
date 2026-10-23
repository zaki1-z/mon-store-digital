import React, { useState, useEffect } from 'react';

// Produits de départ par défaut (tu pourras les modifier ou les supprimer via l'Admin)
const initialProducts = [
  {
    id: '1',
    title: 'Licence Windows 11 Pro (À vie)',
    category: 'Logiciel Officiel',
    description: 'Activation officielle et définitive pour 1 PC. Mises à jour incluses.',
    price: 15,
    image_url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=500&auto=format&fit=crop&q=60',
    file_url: 'https://example.com/windows-pro.pdf'
  },
  {
    id: '2',
    title: 'Microsoft Office 2021 Pro Plus',
    category: 'Bureautique',
    description: 'Word, Excel, PowerPoint, Outlook. Clé officielle liée à votre compte.',
    price: 25,
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60',
    file_url: 'https://example.com/office-2021.pdf'
  }
];

export default function App() {
  // Charger les produits depuis le stockage local du navigateur
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('richtech_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Formulaire d'ajout de produit pour l'Admin
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newFile, setNewFile] = useState('');

  useEffect(() => {
    localStorage.setItem('richtech_products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return alert("Le nom et le prix sont obligatoires !");

    const newProduct = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory || 'Solution Pro',
      description: newDesc || 'Solution professionnelle certifiée RichTech Maroc.',
      price: Number(newPrice),
      image_url: newImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
      file_url: newFile || ''
    };

    setProducts([newProduct, ...products]);
    setNewTitle('');
    setNewCategory('');
    setNewDesc('');
    setNewPrice('');
    setNewImage('');
    setNewFile('');
    alert('Produit ajouté avec succès !');
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleWhatsAppOrder = (product) => {
    const message = encodeURIComponent(`Bonjour RichTech Maroc 👋, je souhaite commander :\n\n📌 *${product.title}*\n💰 Prix : $${product.price}\n\nComment procéder au paiement ?`);
    window.open(`https://wa.me/message/OHTL6X7NT4P7C1?text=${message}`, '_blank');
  };

  const handleDownloadOrContact = (product) => {
    if (product.file_url && product.file_url.startsWith('http')) {
      window.open(product.file_url, '_blank');
    } else {
      handleWhatsAppOrder(product);
    }
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
      {/* En-tête / Branding RichTech Maroc */}
      <header style={{ maxWidth: '1100px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '24px',
          padding: '22px 35px',
          boxShadow: '0 20px 40px -15px rgba(56, 189, 248, 0.15)',
          marginBottom: '25px'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', letterSpacing: '1px', margin: '0 0 8px 0', color: '#ffffff' }}>
            RichTech <span style={{ color: '#38bdf8' }}>MAROC</span>
          </h2>
          <div style={{ display: 'flex', gap: '15px', fontSize: '1.2rem', color: '#38bdf8', marginTop: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
          Votre partenaire de confiance au Maroc pour le matériel informatique, la sécurité, l'IPTV et les licences logicielles.
        </p>

        {/* Liens Réseaux Sociaux */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/richtechmaroc" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#db2777', '#f43f5e')}>
            📸 Instagram
          </a>
          <a href="https://www.facebook.com/share/1AAqXciBiU/" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#2563eb', '#3b82f6')}>
            📘 Facebook
          </a>
          <a href="https://wa.me/message/OHTL6X7NT4P7C1" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#16a34a', '#22c55e')}>
            💬 WhatsApp Business
          </a>
        </div>
      </header>

      {/* Bouton pour ouvrir le panneau Admin */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setIsAdminOpen(!isAdminOpen)}
          style={{
            background: isAdminOpen ? '#ef4444' : '#1e293b',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {isAdminOpen ? 'Fermer le Panneau Admin ✕' : '⚙️ Espace Admin (Ajouter un produit)'}
        </button>
      </div>

      {/* Panneau Admin (Visible uniquement si activé) */}
      {isAdminOpen && (
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto 40px auto',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#38bdf8', fontSize: '1.3rem' }}>➕ Ajouter un nouveau produit au catalogue</h3>
          <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <input type="text" placeholder="Nom du produit (ex: Kaspersky 1 An)" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Catégorie (ex: Cybersécurité)" value={newCategory} onChange={e => setNewCategory(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="Prix en $ (ex: 20)" value={newPrice} onChange={e => setNewPrice(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Lien de l'image (URL photo)" value={newImage} onChange={e => setNewImage(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Lien du fichier (Téléchargement après paiement)" value={newFile} onChange={e => setNewFile(e.target.value)} style={inputStyle} />
            <textarea placeholder="Description du produit..." value={newDesc} onChange={e => setNewDesc(e.target.value)} style={{ ...inputStyle, gridColumn: '1 / -1', height: '80px' }}></textarea>
            <button type="submit" style={{ gridColumn: '1 / -1', background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
              Publier le produit sur le site 🚀
            </button>
          </form>
        </div>
      )}

      {/* Catalogue Client */}
      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#f3f4f6' }}>
            ⚡ Catalogue & Licences Disponibles
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
            ● Service en ligne
          </span>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Aucun produit disponible. Ouvre l'espace admin pour en ajouter !</p>
          </div>
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
                position: 'relative'
              }}>
                {/* Bouton de suppression admin sur chaque carte */}
                {isAdminOpen && (
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Supprimer 🗑️
                  </button>
                )}

                <div>
                  {product.image_url && (
                    <div style={{ width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', background: '#1e293b' }}>
                      <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                    {product.category}
                  </span>
                  
                  <h4 style={{ fontSize: '1.35rem', fontWeight: '700', margin: '14px 0 10px 0', color: '#ffffff' }}>
                    {product.title}
                  </h4>
                  
                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                    {product.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#34d399' }}>
                      ${product.price}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <button 
                      onClick={() => handleWhatsAppOrder(product)}
                      style={{
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                        color: '#fff',
                        border: 'none',
                        padding: '11px',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                      }}
                    >
                      Commander via WhatsApp 💬
                    </button>

                    <button 
                      onClick={() => handleDownloadOrContact(product)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        padding: '10px',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      📥 Télécharger après validation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer Pro */}
      <footer style={{ textAlign: 'center', marginTop: '90px', color: '#64748b', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '25px' }}>
        <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontWeight: '500' }}>RichTech Maroc • Solutions Informatiques & Sécurité</p>
        <p style={{ margin: 0 }}>© 2026 Tous droits réservés.</p>
      </footer>
    </div>
  );
}

const inputStyle = {
  background: '#030712',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '12px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none'
};

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
  };
}
