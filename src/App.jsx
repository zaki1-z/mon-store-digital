import React, { useState, useEffect } from 'react';

const initialProducts = [
  {
    id: '1',
    title: 'Licence Windows 11 Pro (À vie)',
    category: 'Logiciel Officiel',
    description: 'Activation officielle et définitive pour 1 PC. Mises à jour incluses.',
    price: 150,
    image_url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=500&auto=format&fit=crop&q=60',
    file_url: 'https://example.com/windows-pro.pdf'
  },
  {
    id: '2',
    title: 'Microsoft Office 2021 Pro Plus',
    category: 'Bureautique',
    description: 'Word, Excel, PowerPoint, Outlook. Clé officielle liée à votre compte.',
    price: 250,
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60',
    file_url: 'https://example.com/office-2021.pdf'
  }
];

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('richtech_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // États du formulaire de commande client
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clientNom, setClientNom] = useState('');
  const [clientPrenom, setClientPrenom] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // États du formulaire Admin (Ajout / Modif)
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImage_url] = useState('');
  const [file_url, setFile_url] = useState('');

  useEffect(() => {
    localStorage.setItem('richtech_products', JSON.stringify(products));
  }, [products]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'richtech2026') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      alert('Mode Administrateur activé !');
    } else {
      alert('Mot de passe incorrect.');
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    alert('Déconnexion du mode admin.');
  };

  const resetForm = () => {
    setTitle(''); setCategory(''); setDescription(''); setPrice(''); setImage_url(''); setFile_url(''); setEditingId(null);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!title || !price) return alert("Le nom et le prix sont obligatoires !");

    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? {
        ...p, title, category: category || 'Solution Pro', description, price: Number(price), image_url, file_url
      } : p));
      alert('Produit modifié avec succès !');
    } else {
      const newProduct = {
        id: Date.now().toString(),
        title,
        category: category || 'Solution Pro',
        description: description || 'Solution professionnelle certifiée RichTech Maroc.',
        price: Number(price),
        image_url: image_url || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
        file_url
      };
      setProducts([newProduct, ...products]);
      alert('Produit ajouté avec succès !');
    }
    resetForm();
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
    setImage_url(product.image_url);
    setFile_url(product.file_url);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

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

  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc', color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif', padding: '30px 20px', overflowX: 'hidden'
    }}>
      {/* Barre supérieure Admin */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {isAdmin ? (
          <button onClick={handleLogoutAdmin} style={authBtnStyle('#ef4444')}>Quitter le mode Admin ✕</button>
        ) : (
          <button onClick={() => setShowAdminLogin(true)} style={authBtnStyle('#1e293b')}>⚙️ Espace Admin</button>
        )}
      </div>

      {/* Modal Connexion Admin */}
      {showAdminLogin && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#ffffff', border: '1px solid #e2e8f0',
            borderRadius: '20px', padding: '35px', width: '100%', maxWidth: '400px', textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: '#0f172a', marginBottom: '20px' }}>⚙️ Connexion Administrateur</h3>
            <form onSubmit={handleAdminLogin}>
              <input 
                type="password" placeholder="Mot de passe Admin" value={adminPassword} 
                onChange={e => setAdminPassword(e.target.value)} 
                style={{ ...inputStyle, background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', width: '100%', marginBottom: '15px', boxSizing: 'border-box' }} required 
              />
              <button type="submit" style={{
                width: '100%', background: '#0f172a', color: '#fff', border: 'none',
                padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginBottom: '15px'
              }}>
                Se connecter
              </button>
            </form>
            <button onClick={() => setShowAdminLogin(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
              Fermer ✕
            </button>
          </div>
        </div>
      )}

      {/* Modal Formulaire Commande Client */}
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

      {/* En-tête / Style Instagram Pro */}
      <header style={{ maxWidth: '900px', margin: '0 auto 40px auto', textAlign: 'center', background: '#ffffff', borderRadius: '24px', padding: '40px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        
        {/* Logo style Instagram (Cercle épuré identique à ta photo) */}
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

        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 10px 0', color: '#0f172a' }}>
          RichTech Maroc
        </h1>
        <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
          La technologie au service de votre avenir. Informatique, caméras de surveillance, réseaux, IPTV et licences officielles.
        </p>

        {/* Liens Réseaux Sociaux */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/richtechmaroc" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#db2777', '#f43f5e')}>📸 Instagram</a>
          <a href="https://www.facebook.com/share/1AAqXciBiU/" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#2563eb', '#3b82f6')}>📘 Facebook</a>
          <a href="https://wa.me/212602784528" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#16a34a', '#22c55e')}>💬 WhatsApp</a>
        </div>
      </header>

      {/* Panneau Admin */}
      {isAdmin && (
        <div style={{
          maxWidth: '900px', margin: '0 auto 30px auto', background: '#ffffff',
          border: '1px solid #cbd5e1', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.3rem' }}>
            {editingId ? '✏️ Modifier le produit' : '➕ Ajouter un nouveau produit'}
          </h3>
          <form onSubmit={handleSaveProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <input type="text" placeholder="Nom du produit" value={title} onChange={e => setTitle(e.target.value)} style={inputStyleLight} required />
            <input type="text" placeholder="Catégorie (ex: Logiciel)" value={category} onChange={e => setCategory(e.target.value)} style={inputStyleLight} />
            <input type="number" placeholder="Prix en DH (ex: 150)" value={price} onChange={e => setPrice(e.target.value)} style={inputStyleLight} required />
            <input type="text" placeholder="Lien de l'image (URL)" value={image_url} onChange={e => setImage_url(e.target.value)} style={inputStyleLight} />
            <input type="text" placeholder="Lien du fichier (Téléchargement)" value={file_url} onChange={e => setFile_url(e.target.value)} style={inputStyleLight} />
            <textarea placeholder="Description..." value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyleLight, gridColumn: '1 / -1', height: '80px' }}></textarea>
            
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                {editingId ? 'Mettre à jour 💾' : 'Publier 🚀'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={{ background: '#64748b', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer' }}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Catalogue Public */}
      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0, color: '#0f172a' }}>
            ⚡ Catalogue & Licences Disponibles
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#16a34a', background: 'rgba(22, 163, 74, 0.1)', padding: '5px 12px', borderRadius: '20px', fontWeight: '600' }}>
            ● Service en ligne
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <div key={product.id} style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px', padding: '24px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative'
            }}>
              {isAdmin && (
                <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '5px', zIndex: 10 }}>
                  <button onClick={() => handleEditClick(product)} style={{ background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 8px', fontSize: '0.75rem', cursor: 'pointer' }}>Modifier ✏️</button>
                  <button onClick={() => handleDeleteProduct(product.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 8px', fontSize: '0.75rem', cursor: 'pointer' }}>Supprimer 🗑️</button>
                </div>
              )}

              <div>
                {product.image_url && (
                  <div style={{ width: '100%', height: '150px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', background: '#f1f5f9' }}>
                    <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                  {product.category}
                </span>
                
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '12px 0 8px 0', color: '#0f172a' }}>
                  {product.title}
                </h4>
                
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                  {product.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#16a34a' }}>
                    {product.price} DH
                  </span>
                </div>

                <button onClick={() => setSelectedProduct(product)} style={{
                  width: '100%', background: '#0f172a',
                  color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                }}>
                  Acheter 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '70px', color: '#64748b', fontSize: '0.85rem', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
        <p style={{ margin: '0 0 4px 0', color: '#0f172a', fontWeight: '600' }}>RichTech Maroc • Solutions Informatiques & Sécurité</p>
        <p style={{ margin: 0 }}>© 2026 Tous droits réservés.</p>
      </footer>
    </div>
  );
}

const inputStyleLight = { background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px', color: '#0f172a', fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box' };
function authBtnStyle(bg) { return { background: bg, color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }; }
function socialBtnStyle(color1, color2) {
  return {
    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    color: '#fff', padding: '10px 20px', borderRadius: '12px',
    textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  };
}
