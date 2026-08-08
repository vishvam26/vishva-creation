import React, { useState } from 'react';
import { X, Play, Heart, Share2, MessageCircle, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

export default function ReelsGallery({ lang, onClose }) {
  const t = translations[lang];

  const reels = [
    {
      id: 'r1',
      title: 'Crocheting 100 Sunflower Petals 🌻',
      likes: '4.2k',
      comments: '189',
      videoBg: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
      description: 'Behind the scenes crafting our forever blooming flower bouquet stem by stem! 🧶✨'
    },
    {
      id: 'r2',
      title: 'Layering Gold Leaf on Acrylic Canvas 🎨',
      likes: '6.8k',
      comments: '340',
      videoBg: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      description: 'Adding authentic 24k gold foil details to monsoon painting landscape. Pure luxury art!'
    },
    {
      id: 'r3',
      title: 'Aesthetic Gift Box Ribbon Packaging 🎁',
      likes: '3.9k',
      comments: '112',
      videoBg: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      description: 'Packing custom birthday hamper with dried lavender sprigs and handwritten card note.'
    }
  ];

  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [likedMap, setLikedMap] = useState({});

  const toggleLike = (id) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="bg-stone-950 rounded-3xl max-w-md w-full h-[85vh] overflow-hidden shadow-2xl border border-stone-800 text-white relative animate-fadeIn flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors z-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Current Reel Background Visual */}
        <div className="relative flex-1 bg-stone-900 overflow-hidden flex items-center justify-center">
          <img
            src={reels[activeReelIndex].videoBg}
            alt={reels[activeReelIndex].title}
            className="w-full h-full object-cover opacity-85"
          />

          {/* Play Overlay Simulation */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40 pointer-events-none" />

          {/* Reel Info */}
          <div className="absolute bottom-6 left-5 right-16 z-20 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/80 text-white text-[10px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Studio Behind the Scenes</span>
            </div>

            <h3 className="text-base font-bold font-heading drop-shadow-md">
              {reels[activeReelIndex].title}
            </h3>

            <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
              {reels[activeReelIndex].description}
            </p>
          </div>

          {/* Right Action Icons Column */}
          <div className="absolute bottom-8 right-4 z-20 flex flex-col items-center gap-5">
            <button
              onClick={() => toggleLike(reels[activeReelIndex].id)}
              className="flex flex-col items-center text-xs font-semibold"
            >
              <div className={`p-3 rounded-full backdrop-blur-md transition-all ${
                likedMap[reels[activeReelIndex].id]
                  ? 'bg-rose-500 text-white shadow-lg scale-110'
                  : 'bg-stone-900/80 text-stone-200 hover:text-rose-400'
              }`}>
                <Heart className={`w-5 h-5 ${likedMap[reels[activeReelIndex].id] ? 'fill-current' : ''}`} />
              </div>
              <span className="mt-1 text-[10px]">{reels[activeReelIndex].likes}</span>
            </button>

            <button className="flex flex-col items-center text-xs font-semibold text-stone-200">
              <div className="p-3 rounded-full bg-stone-900/80 backdrop-blur-md">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="mt-1 text-[10px]">{reels[activeReelIndex].comments}</span>
            </button>

            <button className="p-3 rounded-full bg-stone-900/80 text-stone-200 backdrop-blur-md">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reels Switcher Navigation */}
        <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center justify-around text-xs font-semibold">
          {reels.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => setActiveReelIndex(idx)}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeReelIndex === idx ? 'bg-rose-500 text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Reel #{idx + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
