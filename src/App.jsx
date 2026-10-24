import React, { useState, useEffect } from 'react';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ_-scpc4pIJ2pgy_yIHrCeNWm07SaS6XkH2Fysf9JIoE1BGq-WYh5-0yyCu8YyFt89WjDdhzL5CI_/pub?gid=0&single=true&output=csv';

// Dictionnaire des traductions
const t = {
  fr: {
    home: "🏠 Accueil",
    catalog: "🛍️ Catalogue & Produits",
    services: "🛠️ Nos Services",
    heroTitle: "Bienvenue chez RichTech Maroc 🚀",
    heroDesc: "Votre partenaire de confiance pour toutes vos solutions informatiques, abonnements IPTV, licences officielles et installations de sécurité.",
    seeCatalog: "Voir le Catalogue 🛍️",
    discoverServices: "Découvrir nos Services 🛠️",
    popularTitle: "🔥 Produits Populaires & Recommandés",
    seeAll: "Voir tout →",
    testimonialsTitle: "⭐ Ce que disent nos clients au Maroc",
    testimonialsSub: "La satisfaction de nos clients est notre priorité absolue.",
    catalogTitle: "⚡ Catalogue",
    searchPlaceholder: "🔍 Rechercher un produit (ex: Windows, Dahua, IPTV...)",
    loading: "Chargement du catalogue...",
    noProducts: "Aucun produit trouvé.",
    buy: "Acheter 🛒",
    servicesTitle: "🛠️ Nos Prestations & Services Techniques",
    servicesSub: "Interventions professionnelles sur terrain pour particuliers et entreprises au Maroc.",
    requestQuote: "Demander un devis 💬",
    footerText: "RichTech Maroc • Solutions Informatiques & Sécurité",
    footerSub: "Contactez-nous directement sur nos réseaux officiels :",
    rights: "© 2026 RichTech Maroc. Tous droits réservés.",
    modalTitle: "🛒 Valider votre commande",
    product: "Produit :",
    name: "Nom",
    firstName: "Prénom",
    email: "Adresse e-mail",
    phone: "Numéro de téléphone",
    whatsappBtn: "Envoyer la commande sur WhatsApp 🚀",
    cancel: "Annuler ✕"
  },
  en: {
    home: "🏠 Home",
    catalog: "🛍️ Catalog & Products",
    services: "🛠️ Our Services",
    heroTitle: "Welcome to RichTech Morocco 🚀",
    heroDesc: "Your trusted partner for all IT solutions, IPTV subscriptions, official software licenses, and security installations.",
    seeCatalog: "View Catalog 🛍️",
    discoverServices: "Discover Our Services 🛠️",
    popularTitle: "🔥 Popular & Recommended Products",
    seeAll: "See all →",
    testimonialsTitle: "⭐ What our clients in Morocco say",
    testimonialsSub: "Client satisfaction is our top priority.",
    catalogTitle: "⚡ Catalog",
    searchPlaceholder: "🔍 Search a product (e.g. Windows, Dahua, IPTV...)",
    loading: "Loading catalog...",
    noProducts: "No products found.",
    buy: "Buy 🛒",
    servicesTitle: "🛠️ Our Technical Services",
    servicesSub: "Professional on-site interventions for individuals and businesses in Morocco.",
    requestQuote: "Request a quote 💬",
    footerText: "RichTech Morocco • IT Solutions & Security",
    footerSub: "Contact us directly on our official networks:",
    rights: "© 2026 RichTech Morocco. All rights reserved.",
    modalTitle: "🛒 Complete Your Order",
    product: "Product:",
    name: "Last Name",
    firstName: "First Name",
    email: "Email Address",
    phone: "Phone Number",
    whatsappBtn: "Send order via WhatsApp 🚀",
    cancel: "Cancel ✕"
  },
  ar: {
    home: "🏠 الرئيسية",
    catalog: "🛍️ الكتالوج والمنتجات",
    services: "🛠️ خدماتنا",
    heroTitle: "مرحباً بكم في ريتش تك المغرب 🚀",
    heroDict: "شريكك الموثوق لجميع حلول تكنولوجيا المعلومات، اشتراكات IPTV، الرخص الرسمية، وأنظمة الحماية.",
    seeCatalog: "تصفح الكتالوج 🛍️",
    discoverServices: "اكتشف خدماتنا 🛠️",
    popularTitle: "🔥 المنتجات الأكثر طلباً وموصى بها",
    seeAll: "عرض الكل ←",
    testimonialsTitle: "⭐ آراء عملائنا في المغرب",
    testimonialsSub: "رضا عملائنا هو أولويتنا القصوى.",
    catalogTitle: "⚡ الكتالوج",
    searchPlaceholder: "🔍 ابحث عن منتج (مثل: Windows, Dahua, IPTV...)",
    loading: "جاري تحميل الكتالوج...",
    noProducts: "لا توجد منتجات مطابقة.",
    buy: "شراء 🛒",
    servicesTitle: "🛠️ خدماتنا والتدخلات التقنية",
    servicesSub: "تدخلات مهنية في الميدان للأفراد والشركات في المغرب.",
    requestQuote: "اطلب تسعيرة 💬",
    footerText: "ريتش تك المغرب • حلول إعلامية وأمنية",
    footerSub: "تواصل معنا مباشرة عبر شبكاتنا الرسمية:",
    rights: "© 2026 ريتش تك المغرب. جميع الحقوق محفوظة.",
    modalTitle: "🛒 تأكيد طلبك",
    product: "المنتج:",
    name: "النسب",
    firstName: "الإسم الشخصي",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتق",
    whatsappBtn: "إرسال الطلب عبر واتساب 🚀",
    cancel: "إلغاء ✕"
  }
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('TOUS');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState('fr'); // 'fr', 'en', 'ar'

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clientNom, setClientNom] = useState('');
  const [clientPrenom, setClientPrenom] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const currentText = t[lang];

  const servicesList = [
    {
      id: 1,
      title: lang === 'ar' ? "تركيب الشبكات والكابلات" : "Installation Réseaux & Câblage",
      desc: lang === 'ar' ? "إعداد الراوتر، السويتش، نقاط الوصول Wi-Fi والربط للشركات والمكاتب والمنازل." : "Configuration de routeurs, switches, points d'accès Wi-Fi et câblage structuré.",
      icon: "🌐",
      badge: lang === 'ar' ? "حسب الطلب" : "Sur Devis"
    },
    {
      id: 2,
      title: lang === 'ar' ? "تركيب كاميرات المراقبة" : "Installation Caméras de Surveillance",
      desc: lang === 'ar' ? "تركيب وإعداد نظام المراقبة مع الرؤية الليلية والمتابعة المباشرة عبر الهاتف." : "Pose et configuration de systèmes de vidéosurveillance avec accès smartphone.",
      icon: "🎥",
      badge: lang === 'ar' ? "جاهز للاستخدام" : "Clé en main"
    },
    {
      id: 3,
      title: lang === 'ar' ? "الصيانة الإعلامية والمادية" : "Maintenance Informatique & Matériel",
      desc: lang === 'ar' ? "تشخيص وإصلاح اللوحات الأم (Micro-soudure)، تحسين الحواسيب وتنظيف الأنظمة." : "Diagnostic, réparation de cartes mères et optimisation PC/PC portables.",
      icon: "🛠️",
      badge: lang === 'ar' ? "تشخيص محترف" : "Diagnostic pro"
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
    setClientNom(''); setClientPrenom(''); setClientEmail(''); setClientPhone('');
  };

  const categories = ['TOUS', ...Array.from(new Set(products.map(p => p.category)))];

  // Filtrage par catégorie ET par recherche en direct
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'TOUS' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularProducts = products.slice(0, 3);

  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc', color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif', padding: '30px 40px', overflowX: 'hidden',
      direction: lang === 'ar' ? 'rtl' : 'ltr'
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
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)', textAlign: lang === 'ar' ? 'right' : 'left'
          }}>
            <h3 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '1.4rem' }}>{currentText.modalTitle}</h3>
            <p style={{ color: '#0284c7', fontSize: '0.95rem', marginBottom: '20px' }}>
              {currentText.product} <strong>{selectedProduct.title}</strong> ({selectedProduct.price} DH)
            </p>

            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder={currentText.name} value={clientNom} onChange={e => setClientNom(e.target.value)} style={inputStyleLight} required />
              <input type="text" placeholder={currentText.firstName} value={clientPrenom} onChange={e => setClientPrenom(e.target.value)} style={inputStyleLight} required />
              <input type="email" placeholder={currentText.email} value={clientEmail} onChange={e => setClientEmail(e.target.value)} style={inputStyleLight} required />
              <input type="tel" placeholder={currentText.phone} value={clientPhone} onChange={e => setClientPhone(e.target.value)} style={inputStyleLight} required />

              <button type="submit" style={{
                background: '#16a34a', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px',
                fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '10px',
                boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)'
              }}>
                {currentText.whatsappBtn}
              </button>
            </form>

            <button onClick={() => setSelectedProduct(null)} style={{
              background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer',
              marginTop: '15px', width: '100%', textAlign: 'center', fontSize: '0.9rem'
            }}>
              {currentText.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Header & Navbar & Selecteur de Langue */}
      <header style={{ maxWidth: '1350px', margin: '0 auto 40px auto', textAlign: 'center', background: '#ffffff', borderRadius: '24px', padding: '40px 30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', position: 'relative' }}>
        
        {/* Sélecteur de Langue en haut */}
        <div style={{ position: 'absolute', top: '20px', [lang === 'ar' ? 'left' : 'right']: '25px', display: 'flex', gap: '6px' }}>
          {['fr', 'en', 'ar'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: lang === l ? '#0f172a' : '#f1f5f9',
                color: lang === l ? '#fff' : '#0f172a',
                border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '8px',
                fontSize: '0.8rem', fontWeight: '750', cursor: 'pointer', textTransform: 'uppercase'
              }}
            >
              {l === 'ar' ? 'العربية' : l}
            </button>
          ))}
        </div>

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

        {/* Navbar */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentPage('home')} style={navBtnStyle(currentPage === 'home')}>
            {currentText.home}
          </button>
          <button onClick={() => { setCurrentPage('catalog'); setActiveCategory('TOUS'); }} style={navBtnStyle(currentPage === 'catalog')}>
            {currentText.catalog}
          </button>
          <button onClick={() => setCurrentPage('services')} style={navBtnStyle(currentPage === 'services')}>
            {currentText.services}
          </button>
        </nav>
      </header>

      {/* Main Pages */}
      <main style={{ maxWidth: '1350px', margin: '0 auto' }}>

        {/* 1. HOME */}
        {currentPage === 'home' && (
          <div>
            <div style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff', borderRadius: '24px', padding: '50px 40px', textAlign: 'center',
              marginBottom: '50px', boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1)'
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '15px' }}>{currentText.heroTitle}</h2>
              <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
                {currentText.heroDesc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <button onClick={() => { setCurrentPage('catalog'); setActiveCategory('TOUS'); }} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
                  {currentText.seeCatalog}
                </button>
                <button onClick={() => setCurrentPage('services')} style={{ background: 'transparent', color: '#fff', border: '2px solid #cbd5e1', padding: '12px 25px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
                  {currentText.discoverServices}
                </button>
              </div>
            </div>

            {/* Populaires */}
            {!loading && popularProducts.length > 0 && (
              <div style={{ marginBottom: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#0f172a' }}>{currentText.popularTitle}</h3>
                  <button onClick={() => { setCurrentPage('catalog'); setActiveCategory('TOUS'); }} style={{ background: 'transparent', border: 'none', color: '#0284c7', fontWeight: '700', cursor: 'pointer' }}>
                    {currentText.seeAll}
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
                          {currentText.buy}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials */}
            <div style={{ marginBottom: '60px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '10px', color: '#0f172a' }}>
                {currentText.testimonialsTitle}
              </h3>
              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem', marginBottom: '35px' }}>
                {currentText.testimonialsSub}
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

        {/* 2. CATALOGUE & RECHERCHE EN DIRECT */}
        {currentPage === 'catalog' && (
          <div>
            {/* Barre de Recherche en direct */}
            <div style={{ marginBottom: '25px', maxWidth: '600px', margin: '0 auto 25px auto' }}>
              <input
                type="text"
                placeholder={currentText.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '14px 20px', borderRadius: '30px', border: '1px solid #cbd5e1',
                  background: '#fff', fontSize: '0.95rem', outline: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  boxSizing: 'border-box'
                }}
              />
            </div>

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
                {currentText.catalogTitle} : {activeCategory}
              </h3>
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>{currentText.loading}</p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>{currentText.noProducts}</p>
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
                        {currentText.buy}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. SERVICES */}
        {currentPage === 'services' && (
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', textAlign: 'center', marginBottom: '10px', color: '#0f172a' }}>
              {currentText.servicesTitle}
            </h3>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem', marginBottom: '40px' }}>
              {currentText.servicesSub}
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
                    {currentText.requestQuote}
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
          {currentText.footerText}
        </h4>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' }}>
          {currentText.footerSub}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
          <a href="https://www.instagram.com/richtechmaroc" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#db2777', '#f43f5e')}>📸 Instagram</a>
          <a href="https://www.facebook.com/share/1AAqXciBiU/" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#2563eb', '#3b82f6')}>📘 Facebook</a>
          <a href="https://wa.me/212602784528" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#16a34a', '#22c55e')}>💬 WhatsApp</a>
        </div>

        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>{currentText.rights}</p>
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
