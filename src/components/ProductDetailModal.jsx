import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Award, Clock, Truck, Sparkles, RefreshCw, Upload, CheckCircle } from 'lucide-react';
import { translations } from '../data/translations';

export default function ProductDetailModal({
  product,
  lang,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenCustomizer
}) {
  const t = translations[lang];
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(product.frameOptions ? product.frameOptions[0] : null);
  
  // Customization Form State
  const [customText, setCustomText] = useState('');
  const [customOccasion, setCustomOccasion] = useState('Birthday');
  const [customPhotoName, setCustomPhotoName] = useState(null);

  if (!product) return null;

  const handleDegreeChange = (e) => {
    setRotationDegree(e.target.value);
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCustomPhotoName(e.target.files[0].name);
    }
  };

  const handleAddToCartCustomized = () => {
    const customDetails = {
      selectedFrame,
      customText,
      customOccasion,
      customPhotoName
    };
    onAddToCart(product, customDetails);
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Gallery & 360 View */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Main Visual Display */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm flex items-center justify-center">
              
              {is360Mode ? (
                /* 360 Rotation Simulation */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-900 text-white relative">
                  <div 
                    className="w-64 h-64 rounded-full bg-gradient-to-tr from-rose-500/20 to-amber-500/20 border-2 border-dashed border-amber-400 flex items-center justify-center transition-transform duration-75 shadow-inner"
                    style={{ transform: `rotate(${rotationDegree}deg)` }}
                  >
                    <img
                      src={product.images[selectedImgIndex]}
                      alt="360 View"
                      className="w-48 h-48 object-cover rounded-full shadow-2xl"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-stone-800/90 p-2.5 rounded-xl flex items-center gap-3">
                    <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotationDegree}
                      onChange={handleDegreeChange}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                    <span className="text-xs text-amber-300 font-mono w-12 text-right">{rotationDegree}°</span>
                  </div>
                </div>
              ) : (
                /* Standard HD Photo Display */
                <img
                  src={product.images[selectedImgIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* 360 Toggle Pill */}
              <button
                onClick={() => setIs360Mode(!is360Mode)}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1.5 ${
                  is360Mode
                    ? 'bg-amber-500 text-stone-900'
                    : 'bg-stone-900/80 text-white hover:bg-stone-900'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{is360Mode ? 'Standard View' : '360° Interactive View'}</span>
              </button>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSelectedImgIndex(idx); setIs360Mode(false); }}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImgIndex === idx && !is360Mode
                      ? 'border-rose-500 ring-2 ring-rose-200'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Handcrafted Authenticity Badges */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Artisan Authenticity Guarantee</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {product.certificate
                  ? 'Includes hand-signed Certificate of Authenticity by the artist.'
                  : '100% handcrafted in small batches using premium sustainable materials.'}
              </p>
            </div>

          </div>

          {/* Right Column: Specs, Customization & Actions */}
          <div className="md:col-span-6 space-y-5">
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge-tag">{product.category}</span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold font-heading text-stone-900">
                {product.title}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold text-rose-600">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs p-4 rounded-2xl bg-stone-50 border border-stone-200">
              {product.medium && (
                <div>
                  <span className="text-stone-400 block font-medium">{t.medium}</span>
                  <span className="font-bold text-stone-800">{product.medium}</span>
                </div>
              )}
              {product.canvasSize && (
                <div>
                  <span className="text-stone-400 block font-medium">{t.size}</span>
                  <span className="font-bold text-stone-800">{product.canvasSize}</span>
                </div>
              )}
              {product.material && (
                <div>
                  <span className="text-stone-400 block font-medium">{t.material}</span>
                  <span className="font-bold text-stone-800">{product.material}</span>
                </div>
              )}
              {product.washCare && (
                <div className="col-span-2">
                  <span className="text-stone-400 block font-medium">{t.washCare}</span>
                  <span className="font-semibold text-stone-800">{product.washCare}</span>
                </div>
              )}
              <div>
                <span className="text-stone-400 block font-medium">{t.craftTime}</span>
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {product.craftTime}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">{t.deliveryTime}</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> {product.deliveryTime}
                </span>
              </div>
            </div>

            {/* Frame Options (For Paintings) */}
            {product.frameOptions && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800 block">Select Frame Finish:</label>
                <div className="flex flex-wrap gap-2">
                  {product.frameOptions.map((frame) => (
                    <button
                      key={frame}
                      onClick={() => setSelectedFrame(frame)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        selectedFrame === frame
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {frame}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Personalized Customization Section */}
            {product.allowCustomization && (
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    <span>Personalize Your Gift</span>
                  </div>
                  <button
                    onClick={() => { onClose(); onOpenCustomizer(product); }}
                    className="text-[11px] font-bold text-rose-600 underline hover:text-rose-800"
                  >
                    Open Visual Canvas Preview →
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Custom Name / Message to write (e.g. Happy Birthday Ananya ❤️)"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={customOccasion}
                      onChange={(e) => setCustomOccasion(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none"
                    >
                      <option value="Birthday">Birthday Gift</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Wedding">Wedding</option>
                      <option value="BabyShower">Baby Shower</option>
                      <option value="Festive">Festival Special</option>
                    </select>

                    <label className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white border border-dashed border-rose-300 text-xs font-semibold text-rose-700 cursor-pointer hover:bg-rose-100/50">
                      <Upload className="w-3.5 h-3.5" />
                      <span className="truncate">{customPhotoName ? customPhotoName : 'Upload Photo'}</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAddToCartCustomized}
                className="flex-1 btn-primary justify-center py-3.5 text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 rounded-full border transition-all ${
                  isWishlisted
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'border-stone-300 text-stone-700 hover:border-rose-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
