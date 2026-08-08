import React from 'react';
import { Sparkles, Heart, Gift, Award, Clock, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';

export default function HeroBanner({ lang, setIsAiModalOpen, setIsBoxBuilderOpen, setCurrentCategory }) {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-rose-50/30 to-stone-50 py-12 md:py-20 border-b border-stone-200/50">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-rose-200 shadow-sm text-xs font-bold text-rose-600">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.madeWithLove}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-stone-900 leading-tight">
              Handcrafted Treasures <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-rose-600 via-amber-600 to-terracotta bg-clip-text text-transparent italic">
                Made to Celebrate Life
              </span>
            </h1>

            <p className="text-base md:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Explore bespoke original canvas paintings, everlasting crochet flowers, soft amigurumi plushies, personalized keychains, and custom handmade gift hampers crafted with artisan perfection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setCurrentCategory('all')}
                className="btn-primary"
              >
                <span>{t.shopNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsBoxBuilderOpen(true)}
                className="btn-secondary"
              >
                <Gift className="w-4 h-4 text-amber-600" />
                <span>{t.giftBoxBuilder}</span>
              </button>

            </div>

            {/* Key Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-200/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-rose-100/80 text-rose-600">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800">100% Handmade</h4>
                  <p className="text-[10px] text-stone-500">Pure Artisan Love</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-100/80 text-amber-700">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800">Original Artwork</h4>
                  <p className="text-[10px] text-stone-500">Signed Certificate</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100/80 text-emerald-700">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800">Custom Orders</h4>
                  <p className="text-[10px] text-stone-500">Name & Photo Gifts</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-100/80 text-indigo-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800">Order Stage Track</h4>
                  <p className="text-[10px] text-stone-500">Live Making Updates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card Stack */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Featured Showcase Image */}
              <div className="glass-card p-3 shadow-2xl relative z-10 border-2 border-white/80">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                  alt="Fine Handmade Artwork"
                  className="w-full h-80 object-cover rounded-xl shadow-md"
                />
                
                {/* Floating Product Pill */}
                <div className="absolute -bottom-5 right-5 bg-white/95 backdrop-filter backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=200&q=80"
                      alt="Crochet Bouquet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Featured Creation</span>
                    <h4 className="text-xs font-bold text-stone-800">Forever Blooming Bouquet</h4>
                    <p className="text-xs text-emerald-600 font-bold">₹1,499 ★ 5.0</p>
                  </div>
                </div>
              </div>

              {/* Decorative Secondary Card */}
              <div className="absolute -top-6 -left-6 w-48 p-2.5 glass-panel rounded-xl shadow-lg transform -rotate-6 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1558060370-d644479be967?auto=format&fit=crop&w=400&q=80"
                  alt="Handmade Amigurumi Bear"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <p className="text-[11px] font-bold text-stone-700 mt-1.5 text-center">Honey Bear Amigurumi</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
