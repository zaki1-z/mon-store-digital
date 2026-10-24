import React, { useState, useEffect } from 'react';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ_-scpc4pIJ2pgy_yIHrCeNWm07SaS6XkH2Fsf9JIoE1BGq-WYh5-0yyCu8YyFt89WjDdhzL5CI_/pub?gid=0&single=true&output=csv';

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
    sortBy: "Trier par :",
    sortDefault: "Par défaut",
    sortPriceAsc: "Prix : Moins cher au plus cher",
    sortPriceDesc: "Prix : Plus cher au moins cher",
    loading: "Chargement du catalogue...",
    noProducts: "Aucun produit trouvé.",
    buyNow: "Acheter direct 🚀",
    addToCart: "Ajouter au panier 🛒",
    servicesTitle: "🛠️ Nos Prestations & Services Techniques",
    servicesSub: "Interventions professionnelles sur terrain pour particuliers et entreprises au Maroc.",
    requestQuote: "Demander un devis 💬",
    faqTitle: "❓ Questions Fréquentes (FAQ)",
    faqSub: "Tout ce que vous devez savoir sur nos services et livraisons au Maroc.",
    footerText: "RichTech Maroc • Solutions Informatiques & Sécurité",
    footerSub: "Contactez-nous directement sur nos réseaux officiels :",
    rights: "© 2026 RichTech Maroc. Tous droits réservés.",
    modalTitle: "🧾 Aperçu de votre facture & Commande",
    name: "Nom",
    firstName: "Prénom",
    email: "Adresse e-mail",
    phone: "Numéro de téléphone",
    whatsappBtn: "Envoyer la commande sur WhatsApp 🚀",
    cancel: "Annuler ✕",
    cartTitle: "🛒 Votre Panier",
    total: "Total :",
    emptyCart: "Votre panier est vide.",
    checkout: "Valider et commander 📦"
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
    sortBy: "Sort by:",
    sortDefault: "Default",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    loading: "Loading catalog...",
    noProducts: "No products found.",
    buyNow: "Buy Now 🚀",
    addToCart: "Add to cart 🛒",
    servicesTitle: "🛠️ Our Technical Services",
    servicesSub: "Professional on-site interventions for individuals and businesses in Morocco.",
    requestQuote: "Request a quote 💬",
    faqTitle: "❓ Frequently Asked Questions (FAQ)",
    faqSub: "Everything you need to know about our services and deliveries in Morocco.",
    footerText: "RichTech Morocco • IT Solutions & Security",
    footerSub: "Contact us directly on our official networks:",
    rights: "© 2026 RichTech Morocco. All rights reserved.",
    modalTitle: "🧾 Invoice Preview & Order",
    name: "Last Name",
    firstName: "First Name",
    email: "Email Address",
    phone: "Phone Number",
    whatsappBtn: "Send order via WhatsApp 🚀",
    cancel: "Cancel ✕",
    cartTitle: "🛒 Your Cart",
    total: "Total:",
    emptyCart: "Your cart is empty.",
    checkout: "Proceed to checkout 📦"
  },
  ar: {
    home: "🏠 الرئيسية",
    catalog: "🛍️ الكتالوج والمنتجات",
    services: "🛠️ خدماتنا",
    heroTitle: "مرحباً بكم في ريتش تك المغرب 🚀",
    heroDesc: "شريكك الموثوق لجميع حلول تكنولوجيا المعلومات، اشتراكات IPTV، الرخص الرسمية، وأنظمة الحماية.",
    seeCatalog: "تصفح الكتالوج 🛍️",
    discoverServices: "اكتشف خدماتنا 🛠️",
    popularTitle: "🔥 المنتجات الأكثر طلباً وموصى بها",
    seeAll: "عرض الكل ←",
    testimonialsTitle: "⭐ آراء عملائنا في المغرب",
    testimonialsSub: "رضا عملائنا هو أولويتنا القصوى.",
    catalogTitle: "⚡ الكتالوج",
    searchPlaceholder: "🔍 ابحث عن منتج (مثل: Windows, Dahua, IPTV...)",
    sortBy: "ترتيب حسب:",
    sortDefault: "الافتراضي",
    sortPriceAsc: "السعر: من الأرخص للأغلى",
    sortPriceDesc: "السعر: من الأغلى للأرخص",
    loading: "جاري تحميل الكتالوج...",
    noProducts: "لا توجد منتجات مطابقة.",
    buyNow: "شراء مباشر 🚀",
    addToCart: "أضف للسلة 🛒",
    servicesTitle: "🛠️ خدماتنا والتدخلات التقنية",
    servicesSub: "تدخلات مهنية في الميدان للأفراد والشركات في المغرب.",
    requestQuote: "اطلب تسعيرة 💬",
    faqTitle: "❓ الأسئلة الشائعة (FAQ)",
    faqSub: "كل ما تحتاج معرفته حول خدماتنا، التوصيل والتفعيل في المغرب.",
    footerText: "ريتش تك المغرب • حلول إعلامية وأمنية",
    footerSub: "تواصل معنا مباشرة عبر شبكاتنا الرسمية:",
    rights: "© 2026 ريتش تك المغرب. جميع الحقوق محفوظة.",
    modalTitle: "🧾 معاينة الفاتورة وتأكيد الطلب",
    name: "النسب",
    firstName: "الإسم الشخصي",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    whatsappBtn: "إرسال الطلب عبر واتساب 🚀",
    cancel: "إلغاء ✕",
    cartTitle: "🛒 سلة المشتريات",
    total: "المجموع الإجمالي:",
    emptyCart: "سلة المشتريات فارغة.",
    checkout: "إتمام الطلب والدفع 📦"
  }
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('TOUS');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [lang, setLang] = useState('fr'); 
  const [darkMode, setDarkMode] = useState(false);

  // Panier & Toast States
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [clientNom, setClientNom] = useState('');
  const [clientPrenom, setClientPrenom] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const currentText = t[lang];

  const theme = {
    bg: darkMode ? '#0f172a' : '#f8fafc',
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    textPrimary: darkMode ? '#f8fafc' : '#0f172a',
    textSecondary: darkMode ? '#94a3b8' : '#475569',
    border: darkMode ? '#334155' : '#e2e8f0',
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showToast(lang === 'ar' ? `تمت إضافة "${product.title}" إلى السلة 🛒` : `"${product.title}" ajouté au panier 🛒`);
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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

  const faqList = [
    {
      q: lang === 'ar' ? "كيف يتم تسليم التراخيص الرقمية والبرامج؟" : "Comment se fait la livraison des licences numériques ?",
      a: lang === 'ar' ? "يتم إرسال مفتاح الترخيص الرسمي ورابط التحميل مباشرة عبر واتساب في غضون بضع دقائق بعد تأكيد الطلب." : "La clé de licence officielle et le lien de téléchargement sont envoyés directement via WhatsApp en quelques minutes après validation."
    },
    {
      q: lang === 'ar' ? "هل اشتراكات IPTV مستقرة أثناء المباريات؟" : "Les abonnements IPTV sont-ils stables pendant les matchs ?",
      a: lang === 'ar' ? "نعم، نستخدم سيرفرات قوية جداً (T-REX وغيرها) مضمونة ضد التقطع وبجودة عالية 4K/FHD." : "Oui, nous proposons des serveurs ultra-stables (T-REX) garantis sans coupure en qualité HD/4K."
    },
    {
      q: lang === 'ar' ? "هل تقدمون خدمات التركيب الميداني في المغرب؟" : "Proposez-vous des installations sur site au Maroc ?",
      a: lang === 'ar' ? "نعم، نوفر تدخلات تقنية لتركيب كاميرات المراقبة والشبكات." : "Oui, nous assurons des interventions professionnelles pour les caméras et réseaux."
    }
  ];

  const partners = [
    "Dahua Technology", "Microsoft Windows", "Office 365", "T-REX IPTV", "Cisco Systems", "TP-Link", "Hikvision", "Adobe CC"
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

          const title = cleanRow[1] || '';
          const category = cleanRow[2] || 'Solution Pro';

          const isJunk = (text) => {
            const lower = text.toLowerCase();
            return lower.includes('function') || lower.includes('prototype') || lower.includes('navigator') || lower.includes('return') || lower.length > 80;
          };

          if (cleanRow.length >= 2 && title && !isJunk(title) && !isJunk(category)) {
            parsedProducts.push({
              id: cleanRow[0] || i.toString(),
              title: title,
              category: category,
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

    let itemsText = cart.map(item => `- ${item.title} (x${item.quantity}) : ${item.price * item.quantity} DH`).join('\n');

    const textMessage = encodeURIComponent(
      `FACTURE & COMMANDE - RichTech Maroc\n\n` +
      `Articles :\n${itemsText}\n\n` +
      `Total Global : ${cartTotal} DH\n\n` +
      `Client : ${clientNom} ${clientPrenom}\n` +
      `E-mail : ${clientEmail}\n` +
      `Téléphone : ${clientPhone}\n\n` +
      `Merci de valider ma commande !`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${textMessage}`, '_blank');

    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCart([]);
    setClientNom(''); setClientPrenom(''); setClientEmail(''); setClientPhone('');
  };

  const handleDirectBuy = (product) => {
    const whatsappNumber = "212602784528"; 
    const textMessage = encodeURIComponent(
      `ACHAT DIRECT - RichTech Maroc\n\n` +
      `Produit : ${product.title}\n` +
      `Prix : ${product.price} DH\n\n` +
      `Merci de valider ma commande !`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${textMessage}`, '_blank');
  };

  const categories = ['TOUS', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'TOUS' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Tri des produits
  if (sortOption === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const popularProducts = products.slice(0, 3);

  return (
    <div style={{
      minHeight: '100vh', background: theme.bg, color: theme.textPrimary,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif', padding: '30px 40px', overflowX: 'hidden',
      direction: lang === 'ar' ? 'rtl' : 'ltr', transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marqueePartners {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animated-banner {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 18s linear infinite;
        }
        .partners-ticker {
          display: flex;
          width: max-content;
          animation: marqueePartners 20s linear infinite;
        }
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -10px rgba(2, 132, 199, 0.2);
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .toast-notification {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification" style={{
          position: 'fixed', bottom: '30px', [lang === 'ar' ? 'left' : 'right']: '30px',
          background: '#16a34a', color: '#fff', padding: '12px 24px', borderRadius: '12px',
          fontWeight: '700', zIndex: 2000, boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Modal Panier */}
      {isCartOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: lang === 'ar' ? 'flex-start' : 'flex-end', zIndex: 1000
        }}>
          <div style={{
            background: theme.cardBg, borderLeft: lang === 'ar' ? 'none' : `1px solid ${theme.border}`,
            borderRight: lang === 'ar' ? `1px solid ${theme.border}` : 'none',
            width: '100%', maxWidth: '420px', height: '100%', padding: '30px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.15)', color: theme.textPrimary, boxSizing: 'border-box'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '15px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>{currentText.cartTitle}</h3>
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: theme.textPrimary }}>✕</button>
              </div>

              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: theme.textSecondary, marginTop: '50px' }}>{currentText.emptyCart}</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '50vh', overflowY: 'auto' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: darkMode ? '#334155' : '#f8fafc', padding: '12px 15px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 5px 0' }}>{item.title}</h4>
                        <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '800' }}>{item.price} DH x {item.quantity}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>🗑️</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.border}`, paddingTop: '15px', marginBottom: '20px', fontSize: '1.1rem', fontWeight: '800' }}>
                  <span>{currentText.total}</span>
                  <span style={{ color: '#16a34a', fontSize: '1.4rem' }}>{cartTotal} DH</span>
                </div>
                <button onClick={() => setIsCheckoutOpen(true)} style={{
                  width: '100%', background: '#16a34a', color: '#fff', border: 'none', padding: '15px',
                  borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)'
                }}>
                  {currentText.checkout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Facture Preview & Checkout */}
      {isCheckoutOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100, padding: '20px'
        }}>
          <div style={{
            background: theme.cardBg, border: `1px solid ${theme.border}`,
            borderRadius: '20px', padding: '30px', width: '100%', maxWidth: '480px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)', textAlign: lang === 'ar' ? 'right' : 'left', color: theme.textPrimary
          }}>
            <h3 style={{ marginBottom: '10px', fontSize: '1.3rem' }}>{currentText.modalTitle}</h3>
            
            {/* Facture Preview Box */}
            <div style={{ background: darkMode ? '#0f172a' : '#f1f5f9', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <div style={{ fontWeight: '700', marginBottom: '8px', color: '#0284c7' }}>RichTech Maroc - Facture Proforma</div>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>{item.title} (x{item.quantity})</span>
                  <span style={{ fontWeight: '700' }}>{item.price * item.quantity} DH</span>
                </div>
              ))}
              <div style={{ borderTop: `1px dashed ${theme.border}`, marginTop: '10px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: '800', color: '#16a34a' }}>
                <span>Total Global :</span>
                <span>{cartTotal} DH</span>
              </div>
            </div>

            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder={currentText.name} value={clientNom} onChange={e => setClientNom(e.target.value)} style={inputStyle(darkMode)} required />
              <input type="text" placeholder={currentText.firstName} value={clientPrenom} onChange={e => setClientPrenom(e.target.value)} style={inputStyle(darkMode)} required />
              <input type="email" placeholder={currentText.email} value={clientEmail} onChange={e => setClientEmail(e.target.value)} style={inputStyle(darkMode)} required />
              <input type="tel" placeholder={currentText.phone} value={clientPhone} onChange={e => setClientPhone(e.target.value)} style={inputStyle(darkMode)} required />

              <button type="submit" style={{
                background: '#16a34a', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px',
                fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '10px',
                boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)'
              }}>
                {currentText.whatsappBtn}
              </button>
            </form>

            <button onClick={() => setIsCheckoutOpen(false)} style={{
              background: 'transparent', border: 'none', color: theme.textSecondary, cursor: 'pointer',
              marginTop: '15px', width: '100%', textAlign: 'center', fontSize: '0.9rem'
            }}>
              {currentText.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #0284c7, #16a34a, #0f172a)',
        color: '#ffffff', padding: '10px 0', borderRadius: '12px', marginBottom: '25px',
        overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: '700', fontSize: '0.9rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div className="animated-banner">
          🚀 تخفيضات كبرى على جميع تراخيص البرامج واشتراكات IPTV • 🎥 عروض حصرية على تركيب كاميرات المراقبة Dahua • 🛠️ ضمان جودة الخدمة والسرعة في التوصيل عبر واتساب!
        </div>
      </div>

      {/* Header */}
      <header style={{ maxWidth: '1350px', margin: '0 auto 40px auto', textAlign: 'center', background: theme.cardBg, borderRadius: '24px', padding: '40px 30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: `1px solid ${theme.border}`, position: 'relative' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: darkMode ? '#334155' : '#0f172a',
                color: '#ffffff', border: `1px solid ${theme.border}`, padding: '10px 18px', borderRadius: '12px',
                fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              {darkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '12px',
                fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
              }}
            >
              🛒 Panier ({totalItemsCount})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['fr', 'en', 'ar'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? '#0284c7' : (darkMode ? '#334155' : '#f1f5f9'),
                  color: lang === l ? '#fff' : theme.textPrimary,
                  border: `1px solid ${theme.border}`, padding: '8px 14px', borderRadius: '10px',
                  fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase'
                }}
              >
                {l === 'ar' ? 'العربية' : l}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          width: '110px', height: '110px', margin: '0 auto 15px auto',
          background: darkMode ? '#334155' : '#f1f5f9', borderRadius: '50%', display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          border: `3px solid ${theme.textPrimary}`, boxShadow: '0 10px 25px rgba(0,0,0,0.08)', padding: '10px'
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '900', margin: '0 0 2px 0', color: theme.textPrimary, lineHeight: '1.1' }}>
            RichTech
          </h2>
          <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '2px', color: theme.textPrimary, marginBottom: '6px' }}>
            MAROC
          </span>
          <div style={{ display: 'flex', gap: '3px', fontSize: '0.7rem' }}>
            <span>🎥</span><span>⌨️</span><span>📱</span><span>📺</span>
          </div>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 8px 0', color: theme.textPrimary }}>
          RichTech Maroc
        </h1>
        <p style={{ color: theme.textSecondary, fontSize: '1rem', maxWidth: '600px', margin: '0 auto 25px auto', lineHeight: '1.5' }}>
          La technologie au service de votre avenir. Informatique, caméras de surveillance, réseaux, IPTV et licences officielles.
        </p>

        <nav style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentPage('home')} style={navBtnStyle(currentPage === 'home', darkMode)}>
            {currentText.home}
          </button>
          <button onClick={() => { setCurrentPage('catalog'); setActiveCategory('TOUS'); }} style={navBtnStyle(currentPage === 'catalog', darkMode)}>
            {currentText.catalog}
          </button>
          <button onClick={() => setCurrentPage('services')} style={navBtnStyle(currentPage === 'services', darkMode)}>
            {currentText.services}
          </button>
        </nav>
      </header>

      {/* Main Pages */}
      <main style={{ maxWidth: '1350px', margin: '0 auto' }}>

        {currentPage === 'home' && (
          <div>
            <div style={{
              background: darkMode ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: `2px solid ${theme.border}`, paddingBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: theme.textPrimary }}>{currentText.popularTitle}</h3>
                  <button onClick={() => { setCurrentPage('catalog'); setActiveCategory('TOUS'); }} style={{ background: 'transparent', border: 'none', color: '#0284c7', fontWeight: '700', cursor: 'pointer' }}>
                    {currentText.seeAll}
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                  {popularProducts.map((product) => (
                    <div key={`pop-${product.id}`} className="product-card" style={{
                      background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '26px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                      <div>
                        {product.image_url && (
                          <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', background: darkMode ? '#334155' : '#f1f5f9' }}>
                            <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#16a34a', background: 'rgba(22, 163, 74, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                          Populaire ⭐
                        </span>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '12px 0 8px 0', color: theme.textPrimary }}>{product.title}</h4>
                        <p style={{ color: theme.textSecondary, fontSize: '0.92rem', lineHeight: '1.5', margin: '0 0 20px 0', whiteSpace: 'pre-line' }}>{product.description}</p>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: '15px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '1.7rem', fontWeight: '800', color: '#16a34a' }}>{product.price} DH</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => addToCart(product)} style={{
                            flex: 1, background: '#0284c7', color: '#fff', border: 'none', padding: '12px',
                            borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem'
                          }}>
                            {currentText.addToCart}
                          </button>
                          <button onClick={() => handleDirectBuy(product)} style={{
                            flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '12px',
                            borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem'
                          }}>
                            {currentText.buyNow}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Partners Brands Ticker */}
            <div style={{ marginBottom: '60px', background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '25px 0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div className="partners-ticker">
                {[...partners, ...partners].map((partner, idx) => (
                  <div key={idx} style={{ padding: '0 40px', fontSize: '1.1rem', fontWeight: '800', color: theme.textSecondary, whiteSpace: 'nowrap', letterSpacing: '1px' }}>
                    ✨ {partner}
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div style={{ marginBottom: '60px', background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '10px', color: theme.textPrimary }}>
                {currentText.testimonialsTitle}
              </h3>
              <p style={{ textAlign: 'center', color: theme.textSecondary, fontSize: '0.95rem', marginBottom: '35px' }}>
                {currentText.testimonialsSub}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {testimonials.map((t) => (
                  <div key={t.id} className="product-card" style={{ background: darkMode ? '#1e293b' : '#f8fafc', border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '10px' }}>★★★★★</div>
                      <p style={{ color: theme.textSecondary, fontSize: '0.92rem', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '15px' }}>"{t.comment}"</p>
                    </div>
                    <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', color: theme.textPrimary }}>{t.name}</span>
                      <span style={{ fontSize: '0.8rem', color: theme.textSecondary, background: darkMode ? '#334155' : '#e2e8f0', padding: '2px 8px', borderRadius: '6px' }}>{t.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Interactive */}
            <div style={{ marginBottom: '60px', background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '10px', color: theme.textPrimary }}>
                {currentText.faqTitle}
              </h3>
              <p style={{ textAlign: 'center', color: theme.textSecondary, fontSize: '0.95rem', marginBottom: '30px' }}>
                {currentText.faqSub}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '800px', margin: '0 auto' }}>
                {faqList.map((faq, index) => (
                  <div key={index} style={{ border: `1px solid ${theme.border}`, borderRadius: '12px', overflow: 'hidden', background: darkMode ? '#1e293b' : '#f8fafc' }}>
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      style={{ width: '100%', background: 'transparent', border: 'none', padding: '18px 20px', textAlign: lang === 'ar' ? 'right' : 'left', fontSize: '1rem', fontWeight: '700', color: theme.textPrimary, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span>{faq.q}</span>
                      <span>{openFaqIndex === index ? '➖' : '➕'}</span>
                    </button>
                    {openFaqIndex === index && (
                      <div style={{ padding: '0 20px 18px 20px', color: theme.textSecondary, fontSize: '0.95rem', lineHeight: '1.6', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. CATALOGUE & RECHERCHE */}
        {currentPage === 'catalog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '25px', maxWidth: '800px', margin: '0 auto 25px auto' }}>
              <input
                type="text"
                placeholder={currentText.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, minWidth: '280px', padding: '14px 20px', borderRadius: '30px', border: `1px solid ${theme.border}`,
                  background: theme.cardBg, color: theme.textPrimary, fontSize: '0.95rem', outline: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  boxSizing: 'border-box'
                }}
              />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{
                  padding: '14px 20px', borderRadius: '30px', border: `1px solid ${theme.border}`,
                  background: theme.cardBg, color: theme.textPrimary, fontSize: '0.95rem', outline: 'none', cursor: 'pointer'
                }}
              >
                <option value="default">{currentText.sortDefault}</option>
                <option value="price-asc">{currentText.sortPriceAsc}</option>
                <option value="price-desc">{currentText.sortPriceDesc}</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '35px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? '#0284c7' : theme.cardBg,
                    color: activeCategory === cat ? '#ffffff' : theme.textSecondary,
                    border: `1px solid ${theme.border}`, padding: '10px 22px', borderRadius: '30px',
                    fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: `2px solid ${theme.border}`, paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: theme.textPrimary, textTransform: 'uppercase' }}>
                {currentText.catalogTitle} : {activeCategory}
              </h3>
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', color: theme.textSecondary, padding: '40px' }}>{currentText.loading}</p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: theme.textSecondary, padding: '40px' }}>{currentText.noProducts}</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px', marginBottom: '60px' }}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card" style={{
                    background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '26px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                  }}>
                    <div>
                      {product.image_url && (
                        <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px', background: darkMode ? '#334155' : '#f1f5f9' }}>
                          <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                        {product.category}
                      </span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '12px 0 8px 0', color: theme.textPrimary }}>{product.title}</h4>
                      <p style={{ color: theme.textSecondary, fontSize: '0.92rem', lineHeight: '1.5', margin: '0 0 20px 0', whiteSpace: 'pre-line' }}>{product.description}</p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: '15px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '1.7rem', fontWeight: '800', color: '#16a34a' }}>{product.price} DH</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => addToCart(product)} style={{
                          flex: 1, background: '#0284c7', color: '#fff', border: 'none', padding: '12px',
                          borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem'
                        }}>
                          {currentText.addToCart}
                        </button>
                        <button onClick={() => handleDirectBuy(product)} style={{
                          flex: 1, background: '#16a34a', color: '#fff', border: 'none', padding: '12px',
                          borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem'
                        }}>
                          {currentText.buyNow}
                        </button>
                      </div>
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
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', textAlign: 'center', marginBottom: '10px', color: theme.textPrimary }}>
              {currentText.servicesTitle}
            </h3>
            <p style={{ textAlign: 'center', color: theme.textSecondary, fontSize: '1rem', marginBottom: '40px' }}>
              {currentText.servicesSub}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              {servicesList.map((srv) => (
                <div key={srv.id} className="product-card" style={{
                  background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '35px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <span style={{ fontSize: '2.8rem' }}>{srv.icon}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)', padding: '6px 14px', borderRadius: '20px' }}>
                        {srv.badge}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.35rem', fontWeight: '700', color: theme.textPrimary, marginBottom: '12px' }}>{srv.title}</h4>
                    <p style={{ color: theme.textSecondary, fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>{srv.desc}</p>
                  </div>

                  <a 
                    href={`https://wa.me/212602784528?text=${encodeURIComponent(`Bonjour RichTech Maroc, je suis intéressé par votre service : ${srv.title}`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      background: darkMode ? '#38bdf8' : '#0f172a', color: darkMode ? '#0f172a' : '#fff', textAlign: 'center', padding: '14px',
                      borderRadius: '10px', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
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
        maxWidth: '1350px', margin: '80px auto 0 auto', background: theme.cardBg,
        border: `1px solid ${theme.border}`, borderRadius: '24px', padding: '40px 30px',
        textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: theme.textPrimary, marginBottom: '10px' }}>
          {currentText.footerText}
        </h4>
        <p style={{ color: theme.textSecondary, fontSize: '0.9rem', marginBottom: '25px' }}>
          {currentText.footerSub}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
          <a href="https://www.instagram.com/richtechmaroc" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#db2777', '#f43f5e')}>📸 Instagram</a>
          <a href="https://www.facebook.com/share/1AAqXciBiU/" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#2563eb', '#3b82f6')}>📘 Facebook</a>
          <a href="https://wa.me/212602784528" target="_blank" rel="noopener noreferrer" style={socialBtnStyle('#16a34a', '#22c55e')}>💬 WhatsApp</a>
        </div>

        <p style={{ margin: 0, color: theme.textSecondary, fontSize: '0.85rem' }}>{currentText.rights}</p>
      </footer>
    </div>
  );
}

function inputStyle(darkMode) {
  return {
    background: darkMode ? '#334155' : '#f8fafc',
    border: `1px solid ${darkMode ? '#475569' : '#cbd5e1'}`,
    borderRadius: '10px', padding: '12px', color: darkMode ? '#f8fafc' : '#0f172a',
    fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'box-border'
  };
}

function navBtnStyle(isActive, darkMode) {
  return {
    background: isActive ? '#0284c7' : (darkMode ? '#334155' : '#f1f5f9'),
    color: isActive ? '#ffffff' : (darkMode ? '#f8fafc' : '#475569'),
    border: `1px solid ${darkMode ? '#475569' : '#cbd5e1'}`, padding: '10px 24px', borderRadius: '30px',
    fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
    boxShadow: isActive ? '0 4px 12px rgba(2, 132, 199, 0.3)' : 'none',
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
