import React, { useState, useEffect } from 'react';

const defaultProducts = [
  {
    id: "p1",
    title: "Handcrafted Village Landscape Painting",
    category: "paintings",
    price: 2499,
    image: "file:///C:/Users/vishv/.gemini/antigravity-ide/brain/54409864-4b41-4302-b65d-a994cfff5e31/media__1786021763909.jpg",
    desc: "Original hand-painted acrylic canvas artwork of a serene village landscape by Vishva (@__vishh.art__)."
  },
  {
    id: "c1",
    title: "Forever Blooming Tulip & Lavender Bouquet",
    category: "crochetFlowers",
    price: 1499,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    desc: "Everlasting hand-crocheted bouquet with tulips, lavenders, and sunflower."
  },
  {
    id: "c2",
    title: "Honey Bear Amigurumi Plushie",
    category: "crochetToys",
    price: 899,
    image: "https://images.unsplash.com/photo-1558060370-d644479be967?auto=format&fit=crop&w=600&q=80",
    desc: "Adorable soft handcrafted teddy bear made with milk cotton yarn."
  },
  {
    id: "k1",
    title: "Personalized Pressed Flower Resin Keychain",
    category: "keychains",
    price: 349,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
    desc: "Initial letter keychain with real pressed flowers & mini crochet charm."
  },
  {
    id: "h1",
    title: "Royal Handmade Keepsake Gift Box",
    category: "giftHampers",
    price: 2999,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    desc: "Includes Mini Canvas Painting, Crochet Flower, Name Keychain & Card."
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("@__vishh.art__ Studio Loading...");

  const [productsList, setProductsList] = useState(defaultProducts);
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedHdProduct, setSelectedHdProduct] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const statuses = [
      "@__vishh.art__ Studio Loading...",
      "Preparing Fine Art Catalog...",
      "Applying Glow Aesthetics...",
      "Welcome to Vish Creation!"
    ];

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          const next = prev + 5;
          if (next > 25 && next <= 50) setStatusText(statuses[1]);
          else if (next > 50 && next <= 75) setStatusText(statuses[2]);
          else if (next > 75) setStatusText(statuses[3]);
          return next;
        } else {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
      });
    }, 35);

    return () => clearInterval(timer);
  }, []);

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const shareProduct = (p) => {
    const shareText = `Check out this handmade ${p.title} for ₹${p.price} by @__vishh.art__!`;
    if (navigator.share) {
      navigator.share({ title: p.title, text: shareText, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToastMsg('Product link copied to clipboard! 📋');
    }
  };

  const filtered = productsList.filter(p => {
    const matchCat = cat === 'all' || p.category === cat;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (p) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === p.id);
      if (exist) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const openSisterPortal = () => {
    if (isAuthenticated) {
      alert('Unlocked: Seller Portal is active!');
    } else {
      const pin = window.prompt('Enter Secret Seller PIN:');
      if (pin && btoa(pin.trim() + "_VISH_CREATION_SECRET_2026") === 'MzgwMl9WSVNIX0NSRUFUSU9OX1NFQ1JFVF8yMDI2') {
        setIsAuthenticated(true);
        alert('🔓 Seller Authenticated! You can now add and delete products.');
      } else if (pin !== null) {
        alert('❌ Invalid PIN! Access Denied.');
      }
    }
  };

  const deleteProduct = (id) => {
    if (!isAuthenticated) {
      alert('Access Denied: Please Login as Seller first!');
      return;
    }
    if (window.confirm('Delete this product from storefront?')) {
      setProductsList(prev => prev.filter(p => p.id !== id));
      removeFromCart(id);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const waMessage = encodeURIComponent(`Hi! I would like to order:\n` + cart.map(c => `- ${c.title} (x${c.qty})`).join('\n') + `\n\nTotal: ₹${total.toLocaleString('en-IN')}`);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#141210] z-50 flex flex-col items-center justify-center text-white px-4">
        <div className="relative flex items-center justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300 animate-spin blur-xl opacity-60"></div>
          <div className="w-28 h-28 rounded-full border-2 border-amber-400/30 animate-ping absolute opacity-40"></div>
          <div className="absolute w-24 h-24 rounded-full bg-[#141210] flex items-center justify-center p-2.5 shadow-2xl border-2 border-amber-400/60">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#141210" />
              <g stroke="#D4AF37" strokeWidth="1.3" opacity="0.9" strokeLinecap="round">
                <path d="M50 50 L50 8" /><path d="M50 50 L50 92" />
                <path d="M50 50 L8 50" /><path d="M50 50 L92 50" />
                <path d="M50 50 L20 20" /><path d="M50 50 L80 80" />
                <path d="M50 50 L80 20" /><path d="M50 50 L20 80" />
                <path d="M50 50 Q62 22 56 10" stroke="#C59B27" strokeWidth="1.6" />
                <path d="M50 50 Q38 78 44 90" stroke="#C59B27" strokeWidth="1.6" />
                <path d="M50 50 Q78 38 90 44" stroke="#C59B27" strokeWidth="1.6" />
                <path d="M50 50 Q22 62 10 56" stroke="#C59B27" strokeWidth="1.6" />
              </g>
              <circle cx="50" cy="50" r="4.5" fill="#141210" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M52 38 L47 18 C46 16 48 15 50 16 C53 18 56 22 57 26 C58 30 55 36 52 38 Z" fill="#E28B7B" />
              <path d="M51 38 C56 36 62 30 65 24 C67 22 66 20 64 21 C60 23 54 31 51 38 Z" fill="#E28B7B" />
            </svg>
          </div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.25em] bg-gradient-to-r from-amber-200 via-rose-300 to-amber-100 bg-clip-text text-transparent uppercase mb-2">
          Vish Creation
        </h2>
        <p className="text-[10px] font-serif italic text-amber-200/80 tracking-widest uppercase mb-4">"Crafted by hand just for you"</p>

        <p className="text-xs text-rose-300 font-mono tracking-wider mb-6 animate-pulse">
          {statusText}
        </p>

        <div className="w-72 h-2 bg-stone-900 rounded-full overflow-hidden p-0.5 border border-amber-500/30 relative">
          <div className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 rounded-full transition-all duration-300 shadow-lg" style={{ width: `${progress}%` }}></div>
        </div>
        
        <span className="text-xs font-mono font-bold text-amber-400 mt-2">{progress}%</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#1E1B18] font-sans antialiased animate-fadeIn">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-full shadow-2xl border border-stone-700">
          {toast}
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-stone-950 text-amber-100 text-xs py-2.5 px-4 border-b border-stone-800 flex justify-between items-center max-w-7xl mx-auto w-full">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          ✨ Handmade Brand by <strong class="text-rose-300 font-bold">Vishva</strong> ❤️
        </span>
        <div className="flex items-center gap-4 text-[11px]">
          <a href="https://instagram.com/__vishh.art__" target="_blank" rel="noreferrer" className="font-bold text-rose-300 hover:text-white">
            🎨 Art IG: @__vishh.art__
          </a>
          <a href="https://instagram.com/vishvayi._" target="_blank" rel="noreferrer" className="font-bold text-amber-300 hover:text-white">
            🧶 Crochet IG: @vishvayi._
          </a>
          <button onClick={openSisterPortal} className="font-bold text-stone-400 hover:underline">
            🔒 Store Login
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/85 backdrop-blur-xl sticky top-0 z-30 border-b border-stone-200/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          {/* Official Sister Brand Logo (Pure Vector SVG - Never breaks!) */}
          <div onClick={() => setCat('all')} className="cursor-pointer flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-full border border-amber-300/80 bg-[#FAF6EE] p-1 shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#FAF6EE" />
                <g stroke="#D4AF37" stroke-width="1.2" opacity="0.85" stroke-linecap="round">
                  <path d="M50 50 L50 8" />
                  <path d="M50 50 L50 92" />
                  <path d="M50 50 L8 50" />
                  <path d="M50 50 L92 50" />
                  <path d="M50 50 L20 20" />
                  <path d="M50 50 L80 80" />
                  <path d="M50 50 L80 20" />
                  <path d="M50 50 L20 80" />
                  <path d="M50 50 Q62 22 56 10" stroke="#C59B27" stroke-width="1.5" />
                  <path d="M50 50 Q38 78 44 90" stroke="#C59B27" stroke-width="1.5" />
                  <path d="M50 50 Q78 38 90 44" stroke="#C59B27" stroke-width="1.5" />
                  <path d="M50 50 Q22 62 10 56" stroke="#C59B27" stroke-width="1.5" />
                  <path d="M50 50 C56 34 66 28 72 18" stroke="#E2C465" stroke-width="1" />
                  <path d="M50 50 C44 66 34 72 28 82" stroke="#E2C465" stroke-width="1" />
                  <path d="M50 50 C66 44 72 34 82 28" stroke="#E2C465" stroke-width="1" />
                  <path d="M50 50 C34 56 28 66 18 72" stroke="#E2C465" stroke-width="1" />
                </g>
                <circle cx="50" cy="50" r="4.5" fill="#FAF6EE" stroke="#D4AF37" stroke-width="1.5" />
                <circle cx="50" cy="42" r="1.3" fill="#D4AF37" />
                <circle cx="50" cy="58" r="1.3" fill="#D4AF37" />
                <circle cx="42" cy="50" r="1.3" fill="#D4AF37" />
                <circle cx="58" cy="50" r="1.3" fill="#D4AF37" />
                <path d="M52 38 L47 18 C46 16 48 15 50 16 C53 18 56 22 57 26 C58 30 55 36 52 38 Z" fill="#8B2500" />
                <path d="M51 38 C56 36 62 30 65 24 C67 22 66 20 64 21 C60 23 54 31 51 38 Z" fill="#8B2500" />
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-950 uppercase">
                Craftique <span className="text-rose-600 font-serif italic text-lg sm:text-xl">Studio</span>
              </h1>
              <p className="text-[10px] font-serif italic text-amber-900 font-medium tracking-wide">
                "Crafted by hand just for you"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a href="https://instagram.com/__vishh.art__" target="_blank" rel="noreferrer" className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 text-white text-xs font-bold shadow-md">
              🎨 DM Art (@__vishh.art__)
            </a>
            <a href="https://instagram.com/vishvayi._" target="_blank" rel="noreferrer" className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-bold shadow-md">
              🧶 DM Crochet (@vishvayi._)
            </a>
            <button onClick={() => setIsCartOpen(true)} className="p-2.5 rounded-full bg-stone-100 relative">
              <span className="text-base">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-950">Featured Goods by @__vishh.art__</h3>
            <p className="text-xs text-stone-500 mt-1">💡 Direct Instagram DM & Share buttons available!</p>
          </div>
          <button onClick={openSisterPortal} className="text-xs font-bold text-stone-500 underline">🔒 Seller Login</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filtered.map(p => (
            <div key={p.id} className="bg-white/95 backdrop-blur-md border border-[#E6DACE] rounded-3xl p-3 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div>
                <div className="relative overflow-hidden rounded-2xl mb-3 aspect-square bg-stone-100 cursor-pointer" onClick={() => setSelectedHdProduct(p)}>
                  <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-2 right-2 bg-stone-950/80 text-white text-[10px] px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍 HD Zoom
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-stone-950 text-sm group-hover:text-rose-600 transition-colors truncate max-w-[170px]">{p.title}</h4>
                  <button onClick={() => shareProduct(p)} title="Share Product" className="text-xs text-stone-400 hover:text-stone-800 p-1">
                    📤
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2 mb-3">{p.desc}</p>
              </div>

              <div>
                <div className="mb-2.5 text-[10px] font-bold">
                  {(p.category === 'crochetFlowers' || p.category === 'crochetToys') ? (
                    <a href="https://instagram.com/vishvayi._" target="_blank" rel="noreferrer" className="block w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-100 text-amber-950 text-center border border-amber-200 shadow-sm transition-all">
                      🧶 DM Crochet IG (@vishvayi._)
                    </a>
                  ) : (
                    <a href="https://instagram.com/__vishh.art__" target="_blank" rel="noreferrer" className="block w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 text-rose-950 text-center border border-pink-200 shadow-sm transition-all">
                      🎨 DM Art IG (@__vishh.art__)
                    </a>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-100 flex justify-between items-center">
                  <span className="font-bold text-stone-950 text-base">₹{p.price.toLocaleString('en-IN')}</span>
                  <div className="flex items-center gap-1.5">
                    {isAuthenticated && (
                      <button onClick={() => deleteProduct(p.id)} title="Delete Product" className="p-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold">
                        🗑️
                      </button>
                    )}
                    <button onClick={() => addToCart(p)} className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C85A32] to-[#B34822] text-white text-xs font-bold shadow-md">
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Artist Story */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 my-14 p-8 rounded-3xl bg-white border border-stone-200/80 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div class="relative group">
          <img src="1000000760.jpg" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"; }} alt="Vishva - Artist" class="w-36 h-36 rounded-2xl object-cover border-4 border-rose-100 shadow-lg shrink-0 hover:scale-105 transition-transform duration-300" />
          <button onClick={openSisterPortal} class="absolute -bottom-2 -right-2 bg-stone-950 text-white p-2 rounded-full shadow-md text-xs hover:bg-rose-600 transition-colors" title="Change Photo via Seller Portal">
            📷
          </button>
        </div>
        <div class="space-y-2 text-center md:text-left">
          <span class="text-[10px] font-bold uppercase tracking-widest text-rose-500">About the Artist</span>
          <h4 class="text-xl font-bold font-serif text-stone-950">Vishva (@__vishh.art__)</h4>
          <p class="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
            Every artwork and crochet creation is 100% handcrafted in small batches by Vishva in her home studio. Check out her Instagram profile <a href="https://instagram.com/__vishh.art__" target="_blank" rel="noreferrer" class="text-rose-600 font-bold underline">@__vishh.art__</a> to see all her art posts and behind-the-scenes craft videos!
          </p>
        </div>
      </section>

    </div>
  );
}
