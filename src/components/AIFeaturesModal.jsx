import React, { useState } from 'react';
import { X, Sparkles, Gift, Palette, Image as ImageIcon, Bot, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { translations } from '../data/translations';
import { products } from '../data/products';

export default function AIFeaturesModal({ lang, onClose, onSelectProduct }) {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('gift');

  // AI Gift Finder State
  const [recipient, setRecipient] = useState('Girlfriend');
  const [budget, setBudget] = useState(1500);
  const [occasion, setOccasion] = useState('Birthday');
  const [aiGiftResults, setAiGiftResults] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // AI Color Matcher State
  const [selectedRoomColor, setSelectedRoomColor] = useState('#E58C8A');

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI Craft Assistant. Ask me anything about handmade gifts, painting mediums, or color recommendations!' }
  ]);
  const [inputChat, setInputChat] = useState('');

  // AI Gift Finder Logic
  const handleRunAiGiftFinder = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      const filtered = products.filter(p => p.price <= budget);
      setAiGiftResults(filtered.length > 0 ? filtered : products.slice(0, 3));
      setIsAiLoading(false);
    }, 600);
  };

  // AI Chat Logic
  const handleSendChat = () => {
    if (!inputChat.trim()) return;
    const userMsg = inputChat;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputChat('');

    setTimeout(() => {
      let reply = "Based on your request, I recommend our Best-selling Forever Blooming Tulip Bouquet (₹1,499) or Honey Bear Plushie (₹899). Both come with free luxury gift packaging!";
      if (userMsg.toLowerCase().includes('painting')) {
        reply = "For fine art lovers, our Golden Hour Monsoon Acrylic Canvas (₹2,499) comes hand-signed by the artist with an authenticity certificate!";
      } else if (userMsg.toLowerCase().includes('budget') || userMsg.toLowerCase().includes('500')) {
        reply = "Under ₹500, check out our Personalized Resin Keychain (₹349) or Potted Sunflower Desk Companion (₹599)!";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 500);
  };

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

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>2026 AI Artisan Engine</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-stone-900">
            {t.aiTitle}
          </h2>
          <p className="text-xs text-stone-500">{t.aiSubtitle}</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('gift')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'gift' ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.aiTabGift}</span>
          </button>

          <button
            onClick={() => setActiveTab('color')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'color' ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-rose-400" />
            <span>{t.aiTabColor}</span>
          </button>

          <button
            onClick={() => setActiveTab('room')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'room' ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.aiTabRoom}</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'chat' ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.aiTabChat}</span>
          </button>
        </div>

        {/* TAB 1: AI Gift Finder */}
        {activeTab === 'gift' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">Gift Recipient:</label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none"
                >
                  <option value="Girlfriend">Girlfriend / Wife</option>
                  <option value="Sister">Sister / Brother</option>
                  <option value="Mother">Mother / Parent</option>
                  <option value="BestFriend">Best Friend</option>
                  <option value="Kids">Kids / Toddler</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">Budget: ₹{budget}</label>
                <input
                  type="range"
                  min="400"
                  max="3500"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer mt-2"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1">Occasion:</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Festive">Festival (Diwali/Rakhi)</option>
                  <option value="JustBecause">Just Because ❤️</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRunAiGiftFinder}
              disabled={isAiLoading}
              className="w-full btn-primary justify-center py-3 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAiLoading ? 'AI Calculating Ideal Gifts...' : 'Run AI Recommendation Engine'}</span>
            </button>

            {/* AI Results Grid */}
            {aiGiftResults && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>AI Recommended Handmade Products for {recipient} ({occasion}):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiGiftResults.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => { onClose(); onSelectProduct(p); }}
                      className="p-3 rounded-2xl border border-stone-200 hover:border-rose-300 bg-white flex items-center gap-3 cursor-pointer transition-all hover:shadow-md"
                    >
                      <img src={p.images[0]} alt={p.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-rose-500 uppercase">{p.category}</span>
                        <h4 className="text-xs font-bold text-stone-900 truncate">{p.title}</h4>
                        <p className="text-xs text-stone-600 font-bold">₹{p.price}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AI Color Matcher */}
        {activeTab === 'color' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 block">Select your room's wall or couch dominant color:</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={selectedRoomColor}
                  onChange={(e) => setSelectedRoomColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border-0"
                />
                <span className="text-xs font-mono text-stone-600 uppercase font-bold">{selectedRoomColor}</span>
              </div>
            </div>

            {/* AI Color Harmony Match Results */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>AI Color Harmony Analysis:</span>
              </h4>
              <p className="text-xs text-stone-600">
                Your room color harmonizes beautifully with soft terracotta paintings and pastel yellow crochet flower arrangements.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {products.slice(0, 2).map((p) => (
                  <div key={p.id} onClick={() => { onClose(); onSelectProduct(p); }} className="cursor-pointer">
                    <img src={p.images[0]} alt="" className="w-full h-24 object-cover rounded-xl mb-1" />
                    <p className="text-[11px] font-bold text-stone-800 truncate">{p.title}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">★ AI Color Match 98%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AI Wall Visualizer */}
        {activeTab === 'room' && (
          <div className="space-y-4">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-900 border-2 border-stone-800 flex items-center justify-center p-6">
              
              {/* Virtual Room Wall Background */}
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="Virtual Wall"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Painting Overlay Simulation on Room Wall */}
              <div className="absolute top-1/4 w-44 h-56 shadow-2xl rounded-sm border-4 border-stone-900 bg-white overflow-hidden transform hover:scale-105 transition-all cursor-grab">
                <img
                  src={products[0].images[0]}
                  alt="Painting on Wall"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-4 bg-stone-900/90 text-white text-[10px] px-3 py-1.5 rounded-full font-mono">
                Canvas Preview: 16x20 Inches on Living Room Wall
              </div>
            </div>

            <p className="text-xs text-stone-500 text-center">
              Visual preview showing how the original canvas painting scales against living room furniture.
            </p>
          </div>
        )}

        {/* TAB 4: AI Gift Assistant Chat */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-2xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-rose-500 text-white font-medium rounded-br-none'
                        : 'bg-white text-stone-800 border border-stone-200 shadow-sm rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask AI: e.g. What is the best anniversary gift under ₹1000?"
                value={inputChat}
                onChange={(e) => setInputChat(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                className="flex-1 px-4 py-2.5 rounded-full border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                onClick={handleSendChat}
                className="p-2.5 rounded-full bg-stone-900 text-white hover:bg-rose-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
