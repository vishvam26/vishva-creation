import React, { useState } from 'react';
import { X, Truck, Search, CheckCircle2, Clock, PackageCheck, Heart, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

export default function OrderTracker({ lang, onClose }) {
  const t = translations[lang];

  const [orderId, setOrderId] = useState('CRAFT-8921');
  const [trackedOrder, setTrackedOrder] = useState({
    id: 'CRAFT-8921',
    customerName: 'Ananya Sharma',
    item: 'Forever Blooming Tulip Bouquet',
    date: 'August 5, 2026',
    stage: 2, // 1: Ordered, 2: Making, 3: Packed, 4: Shipped, 5: Delivered
    estimatedDelivery: 'August 10, 2026',
    makerNote: 'Artist is currently hand-crocheting your 3 pink tulip stems in the studio! 🧶✨'
  });

  const stages = [
    { num: 1, label: t.stages.ordered, icon: '📋' },
    { num: 2, label: t.stages.making, icon: '🧶' },
    { num: 3, label: t.stages.packed, icon: '🎁' },
    { num: 4, label: t.stages.shipped, icon: '🚚' },
    { num: 5, label: t.stages.delivered, icon: '❤️' }
  ];

  const handleTrack = () => {
    if (!orderId.trim()) return;
    setTrackedOrder({
      id: orderId.toUpperCase(),
      customerName: 'Valued Customer',
      item: 'Bespoke Handmade Creation',
      date: 'August 6, 2026',
      stage: 2,
      estimatedDelivery: 'August 11, 2026',
      makerNote: 'Handcrafting progress in studio. Pure handmade artisan care! ✨'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 md:p-8 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <Truck className="w-4 h-4 text-indigo-600" />
            <span>Handmade Order Stage Tracker</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-stone-900">
            {t.orderTrackerTitle}
          </h2>
          <p className="text-xs text-stone-500">Track real-time crafting, packing, and courier dispatch stages</p>
        </div>

        {/* Order Search Input */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder={t.orderPlaceholder}
            className="flex-1 px-4 py-2.5 rounded-full border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <button onClick={handleTrack} className="btn-primary py-2.5 px-5 text-xs">
            <Search className="w-3.5 h-3.5" />
            <span>{t.trackBtn}</span>
          </button>
        </div>

        {/* Order Summary & Progress Timeline */}
        {trackedOrder && (
          <div className="space-y-6">
            
            {/* Meta Pill */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-stone-400 block font-medium">Order Number:</span>
                <span className="font-bold text-stone-900 font-mono text-sm">{trackedOrder.id}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Item Ordered:</span>
                <span className="font-bold text-rose-600">{trackedOrder.item}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Est. Delivery:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {trackedOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Visual Timeline Bar */}
            <div className="relative py-4">
              <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-stone-200 -translate-y-1/2 -z-0 rounded-full" />
              <div 
                className="absolute top-1/2 left-4 h-1.5 bg-gradient-to-r from-amber-500 to-rose-500 -translate-y-1/2 -z-0 rounded-full transition-all duration-500" 
                style={{ width: `${((trackedOrder.stage - 1) / (stages.length - 1)) * 90}%` }}
              />

              <div className="flex items-center justify-between relative z-10">
                {stages.map((st) => {
                  const isCompleted = st.num <= trackedOrder.stage;
                  const isCurrent = st.num === trackedOrder.stage;

                  return (
                    <div key={st.num} className="flex flex-col items-center text-center max-w-[80px]">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all ${
                        isCurrent
                          ? 'bg-rose-500 text-white ring-4 ring-rose-200 scale-110 animate-bounce'
                          : isCompleted
                          ? 'bg-amber-500 text-white'
                          : 'bg-stone-100 text-stone-400 border border-stone-300'
                      }`}>
                        {st.icon}
                      </div>
                      <span className={`text-[10px] font-bold mt-2 leading-tight ${
                        isCompleted ? 'text-stone-900' : 'text-stone-400'
                      }`}>
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Maker Notes */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Live Studio Update from Artist:</span>
              </div>
              <p className="text-xs text-stone-700 italic">
                "{trackedOrder.makerNote}"
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
