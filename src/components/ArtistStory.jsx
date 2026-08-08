import React from 'react';
import { X, Heart, Award, Sparkles, CheckCircle2, PackageCheck, Send, Palette } from 'lucide-react';
import { translations } from '../data/translations';

export default function ArtistStory({ lang, onClose }) {
  const t = translations[lang];

  const processSteps = [
    { num: '01', title: 'Creative Idea & Sketch', desc: 'Every product begins with hand-drawn sketches and yarn color sampling in our home studio.', icon: '💡' },
    { num: '02', title: 'Pure Handcrafting', desc: 'Using 100% organic cotton yarn and fine artist acrylics, items are built stitch-by-stitch and brushstroke-by-brushstroke.', icon: '🎨' },
    { num: '03', title: 'Quality Assurance & Sign', desc: 'Each canvas is hand-signed by the artist with an authentic certificate of creation.', icon: '✨' },
    { num: '04', title: 'Aesthetic Gift Packing', desc: 'Wrapped in gold-foil boxes with dried lavenders and handwritten calligraphy message cards.', icon: '🎁' },
    { num: '05', title: 'Express Delivery', desc: 'Safely dispatched across India with tracking updates at every stage.', icon: '🚚' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 md:p-8 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Bio */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
          <div className="md:col-span-5">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-stone-200">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                alt="The Sister Artist"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 text-center">
                <h3 className="font-heading font-bold text-stone-900 text-sm">Vishva's Sister</h3>
                <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider">Lead Artisan & Founder</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>Artist Story & Philosophy</span>
            </div>

            <h2 className="text-3xl font-bold font-heading text-stone-900 leading-tight">
              "We don't just sell products; we create lifelong memories."
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed">
              Craftique Studio was born out of a deep passion for fine art and crochet craftsmanship. What started as handmade weekend gifts for family turned into an artisanal brand dedicated to bringing warmth, emotion, and elegance into everyday spaces.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-xl font-bold text-stone-900">6+ Years</span>
                <p className="text-[10px] text-stone-500">Crafting Excellence</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-xl font-bold text-stone-900">1,500+</span>
                <p className="text-[10px] text-stone-500">Happy Customers</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-xl font-bold text-stone-900">100%</span>
                <p className="text-[10px] text-stone-500">Handcrafted Love</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="space-y-4 pt-6 border-t border-stone-200">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold font-heading text-stone-900">
              The 5-Step Artisan Crafting Process
            </h3>
            <p className="text-xs text-stone-500">How your handmade orders are carefully built from scratch</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
            {processSteps.map((s) => (
              <div key={s.num} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-xs font-mono font-bold text-amber-700">{s.num}</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900">{s.title}</h4>
                <p className="text-[11px] text-stone-600 leading-tight">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
