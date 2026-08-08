import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, QrCode, CreditCard, Truck, Phone, MessageSquare } from 'lucide-react';
import { translations } from '../data/translations';

export default function CheckoutModal({ totalAmount, lang, onClose, onOrderPlaced }) {
  const t = translations[lang];

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    name: 'Ananya Sharma',
    phone: '+91 98765 43210',
    address: '402, Royal Residency, SG Highway',
    city: 'Ahmedabad',
    pincode: '380054'
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const handlePlaceOrder = () => {
    const orderNum = `CRAFT-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderId(orderNum);
    setIsCompleted(true);
    if (onOrderPlaced) onOrderPlaced(orderNum);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Craftique Studio! I would like to place an order.\n\nOrder Amount: ₹${totalAmount}\nName: ${formData.name}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
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

        {!isCompleted ? (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
              <h2 className="text-2xl font-bold font-heading text-stone-900">
                Complete Your Order (₹{totalAmount.toLocaleString('en-IN')})
              </h2>
            </div>

            {/* Delivery Address Form */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">1. Delivery Address:</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Flat / Building / Street Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">2. Choose Payment Gateway:</h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'upi' ? 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-300' : 'border-stone-200'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Instant UPI / GPay / QR</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'card' ? 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-300' : 'border-stone-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'whatsapp' ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-300' : 'border-stone-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Order via WhatsApp</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'cod' ? 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-300' : 'border-stone-200'
                  }`}
                >
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Simulated QR display if UPI */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
                  <span className="text-xs text-stone-600 font-medium block">Scan QR Code using GPay, PhonePe, or Paytm:</span>
                  <div className="w-32 h-32 rounded-xl bg-white p-2 border border-stone-300 mx-auto flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-stone-800" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-rose-600 block">UPI ID: craftique@upi</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {paymentMethod === 'whatsapp' ? (
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Place Order on WhatsApp</span>
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="w-full btn-primary justify-center py-3.5 text-sm shadow-xl"
              >
                <span>Pay & Confirm Order (₹{totalAmount.toLocaleString('en-IN')})</span>
              </button>
            )}
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="text-2xl font-bold font-heading text-stone-900">
              Order Placed Successfully! 🎉
            </h2>

            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Thank you for supporting small handmade artists! Your order <strong className="font-mono text-rose-600">{generatedOrderId}</strong> is now confirmed. The artist is starting work in the studio.
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-sm mx-auto text-xs space-y-1">
              <span className="font-bold text-amber-900 block">Order Status Timeline:</span>
              <span className="text-stone-700 block">1. Confirmed ➔ 2. Handcrafting in Studio 🧶🎨</span>
            </div>

            <button
              onClick={onClose}
              className="btn-primary px-8 py-3 text-xs"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
