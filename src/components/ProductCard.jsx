import React from 'react';
import { Heart, Star, Eye, ShoppingBag, Clock, Sparkles, Award } from 'lucide-react';
import { translations } from '../data/translations';

export default function ProductCard({
  product,
  lang,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onCustomize
}) {
  const t = translations[lang];

  return (
    <div className="glass-card group relative flex flex-col justify-between overflow-hidden bg-white rounded-2xl border border-stone-200/70 hover:border-rose-300 transition-all duration-300">
      
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="badge-tag bg-amber-500 text-white border-none shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="badge-tag bg-emerald-600 text-white border-none shadow-sm">
              New Arrival
            </span>
          )}
          {product.certificate && (
            <span className="badge-gold shadow-sm">
              <Award className="w-3 h-3" /> Signed Art
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 text-stone-600 hover:text-rose-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-4 py-2 rounded-full bg-white text-stone-900 text-xs font-bold shadow-lg hover:bg-stone-100 transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.viewDetails}</span>
          </button>
        </div>

        {/* Crafting Time Pill */}
        <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-amber-200 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{product.craftTime} Handmade</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Subhead */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-semibold tracking-wider uppercase mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-heading font-semibold text-stone-900 text-sm sm:text-base line-clamp-2 hover:text-rose-600 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-stone-900 font-body">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold">Free Gift Box</p>
          </div>

          <div className="flex items-center gap-1.5">
            {product.allowCustomization && (
              <button
                onClick={() => onCustomize(product)}
                title={t.customizeNow}
                className="p-2 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onAddToCart(product)}
              className="p-2.5 rounded-full bg-stone-900 text-white hover:bg-rose-600 transition-colors shadow-sm"
              title={t.addToCart}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
