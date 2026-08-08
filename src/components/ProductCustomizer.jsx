import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, Type, Palette, ShoppingBag, Check } from 'lucide-react';
import { translations } from '../data/translations';

export default function ProductCustomizer({ product, lang, onClose, onAddToCart }) {
  const t = translations[lang];

  const [previewText, setPreviewText] = useState('Ananya ❤️');
  const [selectedColor, setSelectedColor] = useState('#E58C8A'); // Rose Gold / Soft Pastel
  const [selectedFont, setSelectedFont] = useState('Playfair Display');
  const [photoPreview, setPhotoPreview] = useState(null);

  const colors = [
    { name: 'Rose Pastel', hex: '#E58C8A' },
    { name: 'Golden Sun', hex: '#D4AF37' },
    { name: 'Sage Green', hex: '#7B9B88' },
    { name: 'Terracotta', hex: '#D46A4C' },
    { name: 'Lavender Mist', hex: '#9B51E0' },
    { name: 'Midnight Obsidian', hex: '#1C1917' }
  ];

  const fonts = ['Playfair Display', 'Cinzel', 'Plus Jakarta Sans'];

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhotoPreview(uploadEvent.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddCustomizedToCart = () => {
    const customConfig = {
      isCustomized: true,
      customText: previewText,
      colorHex: selectedColor,
      fontStyle: selectedFont,
      hasUploadedPhoto: !!photoPreview
    };

    onAddToCart(product || {
      id: 'custom-bespoke-item',
      title: `Bespoke Customized ${product ? product.title : 'Gift Craft'}`,
      price: product ? product.price + 300 : 1499,
      images: [product ? product.images[0] : 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80']
    }, customConfig);

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 md:p-8 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Interactive Live Product Customizer</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-stone-900">
            Design Your Personalized Handmade Gift
          </h2>
          <p className="text-xs text-stone-500">
            Customize colors, write names or dates, and upload photos to see a instant real-time preview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Live Canvas Preview */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-stone-200 bg-stone-100 flex items-center justify-center p-6 transition-all" style={{ backgroundColor: selectedColor + '15' }}>
              
              {/* Product Background Visual */}
              <img
                src={product ? product.images[0] : 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'}
                alt="Product Canvas"
                className="w-full h-full object-cover rounded-2xl opacity-80"
              />

              {/* Uploaded Photo Preview Overlay */}
              {photoPreview && (
                <div className="absolute top-6 left-6 w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-xl rotate-[-6deg]">
                  <img src={photoPreview} alt="Uploaded Photo" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Live Text Overlay */}
              {previewText && (
                <div 
                  className="absolute bottom-10 inset-x-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md text-center shadow-lg border border-white/60 transform rotate-1"
                >
                  <p 
                    className="text-lg font-bold transition-all"
                    style={{ 
                      fontFamily: selectedFont, 
                      color: selectedColor === '#1C1917' ? '#1C1917' : selectedColor 
                    }}
                  >
                    "{previewText}"
                  </p>
                  <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mt-1">
                    Hand-Engraved / Hand-painted by Artist
                  </span>
                </div>
              )}

              {/* Live Preview Stamp */}
              <div className="absolute top-4 right-4 bg-stone-900/80 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                LIVE PREVIEW
              </div>
            </div>
          </div>

          {/* Right Column: Customizer Controls */}
          <div className="md:col-span-6 space-y-6">
            
            {/* 1. Custom Text Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-rose-500" />
                <span>1. Enter Name, Date or Message:</span>
              </label>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Type your message here..."
                maxLength={40}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium"
              />
              <span className="text-[10px] text-stone-400 block text-right">{previewText.length}/40 characters</span>
            </div>

            {/* 2. Color Palette */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-amber-500" />
                <span>2. Select Accent Color Palette:</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setSelectedColor(c.hex)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      selectedColor === c.hex ? 'border-stone-900 scale-110 shadow-md' : 'border-white'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.hex && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Typography Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 block">
                3. Choose Calligraphy Style:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {fonts.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFont(f)}
                    className={`p-2 rounded-xl text-xs border text-center transition-all ${
                      selectedFont === f
                        ? 'border-rose-500 bg-rose-50 font-bold text-rose-800'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                    style={{ fontFamily: f }}
                  >
                    {f.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Photo Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                <span>4. Attach Photo for Custom Portrait / Keychain:</span>
              </label>
              <label className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-stone-300 hover:border-rose-400 bg-stone-50 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs font-semibold text-stone-700">
                <ImageIcon className="w-4 h-4 text-stone-500" />
                <span>{photoPreview ? 'Change Photo' : 'Click to Upload Photo from Device'}</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>

            {/* Add Customized Item to Cart */}
            <button
              onClick={handleAddCustomizedToCart}
              className="w-full btn-primary justify-center py-3.5 text-sm shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Custom Creation to Cart (₹{product ? product.price : 1499})</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
