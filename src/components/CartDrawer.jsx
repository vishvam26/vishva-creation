import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Gift, ArrowRight, Sparkles, Check } from 'lucide-react';
import { translations } from '../data/translations';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  lang,
  onProceedToCheckout
}) {
  const t = translations[lang];

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isGiftWrapApplied, setIsGiftWrapApplied] = useState(true);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const giftWrapCost = isGiftWrapApplied ? 99 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount + giftWrapCost);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'HANDMADE10' || couponCode.trim().toUpperCase() === 'CRAFT10') {
      setDiscountPercent(10);
    } else {
      alert('Invalid coupon code. Try HANDMADE10 for 10% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h2 className="font-heading font-bold text-lg text-stone-900">{t.cart} ({cartItems.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
                  🛒
                </div>
                <h3 className="font-heading font-bold text-stone-800 text-base">Your Cart is Empty</h3>
                <p className="text-xs text-stone-500">Add handmade paintings, crochet plushies or personalized gifts to begin!</p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl border border-stone-200 bg-stone-50/50 flex gap-3 relative group">
                  <img
                    src={item.images ? item.images[0] : 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80'}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{item.title}</h4>
                    
                    {/* Custom options pill */}
                    {item.customFields && (
                      <div className="text-[10px] text-rose-600 font-semibold bg-rose-50 p-1 rounded-md line-clamp-1">
                        ✨ Custom: {Array.isArray(item.customFields) ? item.customFields.join(', ') : item.customText || 'Bespoke Item'}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-stone-900 font-body">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      <div className="flex items-center border border-stone-300 rounded-full bg-white text-xs font-bold">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-stone-600 hover:text-stone-900"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-stone-600 hover:text-stone-900"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="text-stone-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              
              {/* Gift Wrap Toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs cursor-pointer">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Gift className="w-4 h-4 text-amber-600" />
                  <span>{t.giftWrap}</span>
                </div>
                <input
                  type="checkbox"
                  checked={isGiftWrapApplied}
                  onChange={(e) => setIsGiftWrapApplied(e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>

              {/* Coupon Box */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Coupon (e.g. HANDMADE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none uppercase font-mono"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
                >
                  {t.applyCoupon}
                </button>
              </div>

              {/* Price Rows */}
              <div className="space-y-1 text-xs pt-2 border-t border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount (10%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-amber-800 font-medium">
                  <span>Gift Box & Packaging:</span>
                  <span>₹{giftWrapCost}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-300">
                  <span>{t.total}:</span>
                  <span className="text-rose-600">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(finalTotal);
                }}
                className="w-full btn-primary justify-center py-3.5 text-sm shadow-xl"
              >
                <span>{t.checkout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
