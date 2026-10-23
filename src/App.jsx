import React, { useState, useEffect } from 'react';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ_-scpc4pIJ2pgy_yIHrCeNWm07SaS6XkH2Fsf9JIoE1BGq-WYh5-0yyCu8YyFt89WjDdhzL5CI_/pub?gid=0&single=true&output=csv';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
              category: row[2] || 'Solution Pro',
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
