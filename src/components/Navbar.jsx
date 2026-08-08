import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sparkles, Truck, ShieldCheck, Menu, X, UserCheck, PackageCheck, Video } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({
  lang,
  setLang,
  currentCategory,
  setCurrentCategory,
  searchTerm,
  setSearchTerm,
  cartCount,
  wishlistCount,
  setIsCartOpen,
  setIsAiModalOpen,
  setIsBoxBuilderOpen,
  setIsOrderTrackerOpen,
  setIsAdminOpen,
  setIsReelsOpen,
  setIsArtistStoryOpen
}) {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-stone-900 text-amber-100 text-xs py-2 px-4 text-center flex items-center justify-center gap-4 flex-wrap font-medium">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          {t.madeWithLove}
        </span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline-flex items-center gap-1 text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5" /> Free Gift Packing on Orders Over ₹999
        </span>
        
        {/* Language Selector Pills */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setLang('en')}
            className={`lang-pill ${lang === 'en' ? 'active' : 'text-stone-300'}`}
          >
            {t.langEn}
          </button>
          <button
            onClick={() => setLang('gu')}
            className={`lang-pill ${lang === 'gu' ? 'active' : 'text-stone-300'}`}
          >
            {t.langGu}
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`lang-pill ${lang === 'hi' ? 'active' : 'text-stone-300'}`}
          >
            {t.langHi}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="glass-panel border-b border-stone-200/60">
        <div className="container-custom py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div 
              onClick={() => { setCurrentCategory('all'); setSearchTerm(''); }}
              className="cursor-pointer group flex items-center gap-2.5"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                ✨
              </div>
              <div>
                <h1 className="font-title text-xl md:text-2xl font-bold tracking-wider text-stone-800 group-hover:text-rose-600 transition-colors">
                  {t.brandName}
                </h1>
                <p className="text-[10px] text-stone-500 tracking-widest uppercase font-semibold">
                  {t.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-stone-100/90 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50 transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            

            {/* Build Box Button */}
            <button
              onClick={() => setIsBoxBuilderOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all border border-stone-200"
            >
              <span>🎁</span>
              <span>{t.giftBoxBuilder}</span>
            </button>

            {/* Track Order */}
            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              title={t.trackOrder}
              className="p-2.5 rounded-full text-stone-700 hover:bg-stone-100 transition-colors relative"
            >
              <Truck className="w-5 h-5" />
            </button>

            {/* Reels / BTS */}
            <button
              onClick={() => setIsReelsOpen(true)}
              title={t.reelsGallery}
              className="hidden sm:flex p-2.5 rounded-full text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <Video className="w-5 h-5" />
            </button>

            {/* Cart Drawer Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full text-stone-800 hover:bg-rose-50 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Owner Admin Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              title="Artist / Admin Dashboard"
              className="p-2.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <UserCheck className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-stone-100 border border-stone-200 text-xs focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="border-t border-stone-200/40 bg-white/70 overflow-x-auto no-scrollbar">
          <div className="container-custom py-2 flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
            {Object.keys(t.categories).map((catKey) => {
              const isActive = currentCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => {
                    setCurrentCategory(catKey);
                    setSearchTerm('');
                  }}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-sm font-bold'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {t.categories[catKey]}
                </button>
              );
            })}

            {/* Artist Story Link */}
            <button
              onClick={() => setIsArtistStoryOpen(true)}
              className="px-4 py-1.5 rounded-full text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 font-bold ml-auto"
            >
              👩‍🎨 Meet the Artist
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
