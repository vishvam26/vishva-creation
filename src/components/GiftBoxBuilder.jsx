import React, { useState } from 'react';
import { X, Gift, Check, Sparkles, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { translations } from '../data/translations';

export default function GiftBoxBuilder({ lang, onClose, onAddToCart }) {
  const t = translations[lang];

  // Steps state
  const [activeStep, setActiveStep] = useState(1);

  // Box selections
  const boxStyles = [
    { id: 'b1', name: 'Royal Gold-Foil Velvet Box', price: 299, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80' },
    { id: 'b2', name: 'Pastel Floral Keepsake Box', price: 249, image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd454a?auto=format&fit=crop&w=400&q=80' },
    { id: 'b3', name: 'Eco-Kraft Vintage Box with Dried Flowers', price: 199, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' }
  ];

  const availableItems = [
    { id: 'h_crochet', name: 'Handmade Crochet Tulip Stem', price: 249, icon: '🌷' },
    { id: 'h_painting', name: 'Mini Hand-painted Canvas with Wood Easel', price: 599, icon: '🎨' },
    { id: 'h_keychain', name: 'Custom Name Resin Keychain', price: 349, icon: '🔑' },
    { id: 'h_bookmark', name: 'Hand-painted Floral Wooden Bookmark', price: 199, icon: '🔖' },
    { id: 'h_candle', name: 'Organic Scented Lavender Soy Candle', price: 399, icon: '🕯️' },
    { id: 'h_chocolates', name: 'Artisanal Handmade Chocolates Pack', price: 299, icon: '🍫' }
  ];

  const [selectedBox, setSelectedBox] = useState(boxStyles[0]);
  const [selectedItems, setSelectedItems] = useState([availableItems[0], availableItems[1]]);
  const [giftNote, setGiftNote] = useState('Wishing you all the happiness and joy! ❤️');
  const [recipientName, setRecipientName] = useState('Dear Ananya');

  const toggleItem = (item) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const totalPrice = selectedBox.price + selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  const handleAddHamperToCart = () => {
    const hamperItem = {
      id: `custom-hamper-${Date.now()}`,
      title: `Custom Gift Hamper (${selectedItems.length} Handmade Items)`,
      price: totalPrice,
      images: [selectedBox.image],
      customFields: [
        `Box: ${selectedBox.name}`,
        `Items: ${selectedItems.map(i => i.name).join(', ')}`,
        `Card To: ${recipientName}`,
        `Message: ${giftNote}`
      ]
    };

    onAddToCart(hamperItem);
    onClose();
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

        {/* Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
            <Gift className="w-4 h-4 text-rose-500" />
            <span>Interactive Gift Box Builder</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-stone-900">
            {t.hamperTitle}
          </h2>
          <p className="text-xs text-stone-500">{t.hamperSubtitle}</p>
        </div>

        {/* Wizard Steps Nav */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
          <button
            onClick={() => setActiveStep(1)}
            className={`flex-1 text-center py-2 text-xs font-bold border-b-2 transition-all ${
              activeStep === 1 ? 'border-rose-500 text-rose-600' : 'border-transparent text-stone-400'
            }`}
          >
            {t.step1}
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`flex-1 text-center py-2 text-xs font-bold border-b-2 transition-all ${
              activeStep === 2 ? 'border-rose-500 text-rose-600' : 'border-transparent text-stone-400'
            }`}
          >
            {t.step2} ({selectedItems.length})
          </button>
          <button
            onClick={() => setActiveStep(3)}
            className={`flex-1 text-center py-2 text-xs font-bold border-b-2 transition-all ${
              activeStep === 3 ? 'border-rose-500 text-rose-600' : 'border-transparent text-stone-400'
            }`}
          >
            {t.step3}
          </button>
        </div>

        {/* Step 1: Select Box Style */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-800">Select Packaging Box & Ribbon Style:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {boxStyles.map((box) => (
                <div
                  key={box.id}
                  onClick={() => setSelectedBox(box)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedBox.id === box.id
                      ? 'border-rose-500 bg-rose-50/50 shadow-md ring-2 ring-rose-200'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <img src={box.image} alt={box.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                  <h4 className="text-xs font-bold text-stone-900">{box.name}</h4>
                  <p className="text-xs text-rose-600 font-bold mt-1">₹{box.price}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={() => setActiveStep(2)} className="btn-primary">
                Next: Choose Items →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Items */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-800">Pick Handmade Items to Include in Box:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableItems.map((item) => {
                const isSelected = selectedItems.some(i => i.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold">{item.name}</h4>
                        <p className="text-xs font-semibold text-rose-600">₹{item.price}</p>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      isSelected ? 'bg-rose-500 text-white border-rose-500' : 'border-stone-300'
                    }`}>
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-stone-400" />}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-4">
              <button onClick={() => setActiveStep(1)} className="btn-secondary">
                ← Back
              </button>
              <button onClick={() => setActiveStep(3)} className="btn-primary">
                Next: Add Note →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Card Note & Checkout */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-800">Write Personal Handwritten Calligraphy Card Note:</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Recipient Name:</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Message Note:</label>
                <textarea
                  rows={3}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none font-serif text-stone-800"
                />
              </div>
            </div>

            {/* Total Summary Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block">Custom Hamper Total</span>
                <span className="text-xs text-stone-600">Box ({selectedBox.name}) + {selectedItems.length} Handcrafted Items</span>
              </div>
              <span className="text-2xl font-bold text-stone-900">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button onClick={() => setActiveStep(2)} className="btn-secondary">
                ← Back
              </button>
              <button onClick={handleAddHamperToCart} className="btn-primary py-3.5 shadow-xl">
                <ShoppingBag className="w-4 h-4" />
                <span>Add Customized Gift Box to Cart</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
