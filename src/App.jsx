import React, { useState, useEffect } from 'react';

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
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('richtech_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [user, setUser] = useState(null); // { email, role, verifiedPurchases: [] }
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Formulaire Admin
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

  // Étape 1 : Envoyer le code de confirmation par e-mail
  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!authEmail || !authEmail.includes('@')) {
      return alert("Veuillez entrer une adresse e-mail valide.");
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    // Simulation de l'envoi d'e-mail (dans un cas réel, un service d'e-mailing envoie ce code)
    alert(`[Simulation e-mail envoyé à ${authEmail}] 📧\nVotre code de confirmation de sécurité est : ${code}`);
  };

  // Étape 2 : Vérifier le code OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp === generatedOtp) {
      setUser({ email: authEmail, role: 'client', purchases: [] });
      setShowAuthModal(false);
      setAuthEmail('');
      setEnteredOtp('');
      setOtpSent(false);
      alert("Identité confirmée avec succès ! Bienvenue.");
    } else {
      alert("Code de confirmation incorrect. Veuillez réessayer.");
    }
  };

  // Connexion Admin sécurisée
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'richtech2026') {
      setUser({ email: 'admin@richtech.ma', role: 'admin', purchases: [] });
      setShowAuthModal(false);
      setAdminPassword('');
      alert('Connexion Administrateur réussie !');
    } else {
      alert('Mot de passe administrateur incorrect.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEditingId(null);
    resetForm();
    alert('Déconnexion réussie.');
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

  const handleWhatsAppOrder = (product) => {
    const message = encodeURIComponent(`Bonjour RichTech Maroc 👋, je souhaite commander :\n\n📌 *${product.title}*\n💰 Prix : $${product.price}\n\nJe souhaite procéder au paiement pour recevoir mon lien de téléchargement.`);
    window.open(`https://wa.me/message/OHTL6X7NT4P7C1?text=${message}`, '_blank');
  };

  // Logique intelligente de téléchargement sécurisé après validation
  const handleSecureDownload = (product) => {
    if (!user) {
      alert("Veuillez vous connecter avec votre e-mail pour accéder à vos téléchargements sécurisés.");
      setShowAuthModal(true);
      return;
    }

    // Si l'utilisateur est admin, il a accès à tout
    if (user.role === 'admin') {
      if (product.file_url) window.open(product.file_url, '_blank');
      else alert("Aucun fichier lié à ce produit.");
      return;
    }

    // Pour un client normal : vérification si le produit a été payé/validé
    const hasPaid = user.purchases && user.purchases.includes(product.id);

    if (hasPaid && product.file_url) {
      window.open(product.file_url, '_blank');
    } else {
      alert(`🔒 Accès restreint :\n\nPour télécharger "${product.title}", le paiement doit d'abord être validé par notre équipe.\n\nVeuillez cliquer sur "Commander via WhatsApp" pour régler votre commande et valider votre accès.`);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#030712', color: '#f9fafb',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif', padding: '40px 20px', overflowX: 'hidden'
    }}>
      {/* Barre d'authentification supérieure */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
          {user ? (
            <span>Connecté : <strong style={{ color: '#38bdf8' }}>{user.email}</strong> {user.role === 'admin' && '👑 (Admin)'}</span>
          ) : (
            <span>Visiteur non authentifié</span>
          )}
        </div>
        <div>
          {user ? (
            <button onClick={handleLogout} style={authBtnStyle('#ef4444')}>Se déconnecter</button>
          ) : (
            <button onClick={() => setShowAuthModal(true)} style={authBtnStyle('#2563eb')}>🔑 Connexion / Inscription par E-mail</button>
          )}
        </div>
      </div>

      {/* Modal d'Authentification par Code e-mail (OTP) et Admin */}
      {showAuthModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px', padding: '35px', width: '100%', maxWidth: '400px', textAlign: 'center'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>🔐 Espace Sécurisé RichTech</h3>
            
            {!otpSent ? (
              <form onSubmit={handleRequestOtp}>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '15px' }}>Entrez votre e-mail pour recevoir un code de confirmation :</p>
                <input 
                  type="email" placeholder="votre.email@gmail.com" value={authEmail} 
                  onChange={e => setAuthEmail(e.target.value)} 
                  style={{ ...inputStyle, width: '100%', marginBottom: '15px', boxSizing: 'border-box' }} required 
                />
                <button type="submit" style={{
                  width: '100%', background: '#2563eb', color: '#fff', border: 'none',
                  padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginBottom: '15px'
                }}>
                  Envoyer le code de validation 📩
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <p style={{ color: '#34d399', fontSize: '0.85rem', marginBottom: '15px' }}>Un code a été envoyé à <strong>{authEmail}</strong>. Entrez-le ci-dessous :</p>
                <input 
                  type="text" placeholder="Entrez le code à 4 chiffres" value={enteredOtp} 
                  onChange={e => setEnteredOtp(e.target.value)} 
                  style={{ ...inputStyle, width: '100%', marginBottom: '15px', boxSizing: 'border-box', textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem' }} required 
                />
                <button type="submit" style={{
                  width: '100%', background: '#16a34a', color: '#fff', border: 'none',
                  padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginBottom: '15px'
                }}>
                  Confirmer le code ✅
                </button>
              </form>
            )}

            <div style={{ color: '#64748b', margin: '15px 0', fontSize: '0.85rem' }}>--- OU ACCÈS ADMIN ---</div>

            <form onSubmit={handleAdminLogin}>
              <input 
                type="password" placeholder="Mot de passe Admin" value={adminPassword} 
                onChange={e => setAdminPassword(e.target.value)} 
                style={{ ...inputStyle, width: '100%', marginBottom: '15px', boxSizing: 'border-box' }} required 
              />
              <button type="submit" style={{
                width: '100%', background: '#334155', color: '#fff', border: 'none',
                padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginBottom: '15px'
              }}>
                Connexion Admin ⚙️
              </button>
            </form>

            <button onClick={() => { setShowAuthModal(false); setOtpSent(false); }} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              Fermer ✕
            </button>
          </div>
        </div>
      )}

      {/* En-tête / Branding RichTech Maroc */}
      <header style={{ maxWidth: '1100px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px', padding: '22px 35px', marginBottom: '25px'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', margin: '0 0 8px 0', color: '#ffffff' }}>
            RichTech <span style={{ color: '#38bdf8' }}>MAROC</span>
          </h2>
          <div style={{ display: 'flex', gap: '15px', fontSize: '1.2rem', color: '#38bdf8', marginTop: '5px' }}>
            <span>🎥 CCTV</span><span>⌨️ IT</span><span>📱 Mobile</span><span>📺 IPTV</span>
          </div>
        </div>

        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '0 0 15px 0', background: 'linear-gradient(to right, #60a5fa, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Solutions Numériques & Licences Officielles
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
          Votre partenaire de confiance au Maroc pour le matériel informatique, la sécurité, l'IPTV et les licences logicielles.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/richtechmaroc" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#db2777', '#f43f5e')}>📸 Instagram</a>
          <a href="https://www.facebook.com/share/1AAqXciBiU/" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#2563eb', '#3b82f6')}>📘 Facebook</a>
          <a href="https://wa.me/message/OHTL6X7NT4P7C1" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#16a34a', '#22c55e')}>💬 WhatsApp Business</a>
        </div>
      </header>

      {/* Panneau Admin */}
      {user && user.role === 'admin' && (
        <div style={{
          maxWidth: '1100px', margin: '0 auto 40px auto', background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '20px', padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#38bdf8', fontSize: '1.3rem' }}>
            {editingId ? '✏️ Modifier le produit' : '➕ Ajouter un nouveau produit'}
          </h3>
          <form onSubmit={handleSaveProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <input type="text" placeholder="Nom du produit" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Catégorie (ex: Logiciel)" value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} />
            <input type="number" placeholder="Prix en $ (ex: 20)" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} required />
            <input type="text" placeholder="Lien de l'image (URL)" value={image_url} onChange={e => setImage_url(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Lien du fichier (Téléchargement sécurisé)" value={file_url} onChange={e => setFile_url(e.target.value)} style={inputStyle} />
            <textarea placeholder="Description..." value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, gridColumn: '1 / -1', height: '80px' }}></textarea>
            
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                {editingId ? 'Mettre à jour le produit 💾' : 'Publier le produit 🚀'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={{ background: '#475569', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer' }}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Catalogue Public */}
      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#f3f4f6' }}>
            ⚡ Catalogue & Licences Disponibles
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '6px 14px', borderRadius: '20px' }}>
            ● Service sécurisé
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          {products.map((product) => (
            <div key={product.id} style={{
              background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.6) 100%)',
              backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px', padding: '28px', boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative'
            }}>
              {user && user.role === 'admin' && (
                <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '5px' }}>
                  <button onClick={() => handleEditClick(product)} style={{ background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '0.75rem', cursor: 'pointer' }}>Modifier ✏️</button>
                  <button onClick={() => handleDeleteProduct(product.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '0.75rem', cursor: 'pointer' }}>Supprimer 🗑️</button>
                </div>
              )}

              <div>
                {product.image_url && (
                  <div style={{ width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', background: '#1e293b' }}>
                    <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
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
                  <button onClick={() => handleWhatsAppOrder(product)} style={{
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: '#fff', border: 'none', padding: '11px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer'
                  }}>
                    Commander & Payer via WhatsApp 💬
                  </button>

                  <button onClick={() => handleSecureDownload(product)} style={{
                    background: 'rgba(255, 255, 255, 0.06)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '10px', borderRadius: '10px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer'
                  }}>
                    📥 Télécharger (Réservé après paiement)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '90px', color: '#64748b', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '25px' }}>
        <p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontWeight: '500' }}>RichTech Maroc • Solutions Informatiques & Sécurité</p>
        <p style={{ margin: 0 }}>© 2026 Tous droits réservés.</p>
      </footer>
    </div>
  );
}

const inputStyle = { background: '#030712', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: '#fff', fontSize: '0.9rem', outline: 'none' };
function authBtnStyle(bg) { return { background: bg, color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }; }
function socialBtnStyle(color1, color2) { return { background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`, color: '#fff', padding: '11px 22px', borderRadius: '12px', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }; }
