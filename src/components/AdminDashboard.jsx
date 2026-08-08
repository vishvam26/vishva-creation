import React, { useState } from 'react';
import { X, TrendingUp, ShoppingBag, Users, PackageCheck, AlertCircle, CheckCircle, Search, Edit3, Trash2, DollarSign } from 'lucide-react';
import { translations } from '../data/translations';
import { products, reviewsData } from '../data/products';

export default function AdminDashboard({ lang, onClose }) {
  const t = translations[lang];

  const [adminTab, setAdminTab] = useState('analytics');

  // Simulated Orders State
  const [orders, setOrders] = useState([
    { id: 'CRAFT-8921', customer: 'Ananya Sharma', item: 'Forever Blooming Tulip Bouquet', amount: 1499, status: 'Making', date: 'Aug 5, 2026' },
    { id: 'CRAFT-8922', customer: 'Rohan Patel', item: 'Golden Hour Canvas Painting', amount: 2499, status: 'Packed', date: 'Aug 5, 2026' },
    { id: 'CRAFT-8923', customer: 'Pooja Mehta', item: 'Honey Bear Amigurumi Plushie', amount: 899, status: 'Ordered', date: 'Aug 6, 2026' }
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 md:p-8 relative animate-fadeIn text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dashboard Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-xs font-bold mb-1">
              <span>Studio Owner Control Panel</span>
            </div>
            <h2 className="text-2xl font-bold font-heading">Artist Admin Dashboard</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAdminTab('analytics')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                adminTab === 'analytics' ? 'bg-rose-500 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setAdminTab('orders')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                adminTab === 'orders' ? 'bg-rose-500 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setAdminTab('inventory')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                adminTab === 'inventory' ? 'bg-rose-500 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Catalog Stock
            </button>
          </div>
        </div>

        {/* TAB 1: Analytics Overview */}
        {adminTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <div className="flex items-center justify-between text-rose-600 mb-1">
                  <span className="text-xs font-bold uppercase">Total Revenue</span>
                  <DollarSign className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold font-body text-stone-900">₹48,920</span>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">↑ +24% this month</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between text-amber-700 mb-1">
                  <span className="text-xs font-bold uppercase">Total Orders</span>
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold text-stone-900">42</span>
                <p className="text-[10px] text-amber-800 font-bold mt-1">12 Custom Handcrafted</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center justify-between text-emerald-700 mb-1">
                  <span className="text-xs font-bold uppercase">Conversion Rate</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold text-stone-900">4.8%</span>
                <p className="text-[10px] text-emerald-700 font-bold mt-1">Top 5% Handmade Stores</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                <div className="flex items-center justify-between text-indigo-700 mb-1">
                  <span className="text-xs font-bold uppercase">Abandoned Carts</span>
                  <AlertCircle className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold text-stone-900">3</span>
                <p className="text-[10px] text-indigo-700 font-bold mt-1">Auto WhatsApp Recovery Sent</p>
              </div>
            </div>

            {/* Top Sold Items */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Top Selling Creations this Week:</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs bg-white p-3 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900">1. Forever Blooming Tulip Bouquet</span>
                  <span className="text-rose-600 font-bold">18 Units Sold</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-white p-3 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900">2. Honey Bear Amigurumi Plushie</span>
                  <span className="text-rose-600 font-bold">14 Units Sold</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-white p-3 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-900">3. Golden Hour Monsoon Canvas Painting</span>
                  <span className="text-rose-600 font-bold">6 Units Sold</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Orders Management */}
        {adminTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-800">Live Customer Orders & Handmade Stage Controls:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-100 text-stone-600 border-b border-stone-200 font-bold uppercase">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Item</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Stage</th>
                    <th className="p-3">Update Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="p-3 font-mono font-bold text-stone-900">{o.id}</td>
                      <td className="p-3 font-semibold">{o.customer}</td>
                      <td className="p-3 text-stone-600 truncate max-w-xs">{o.item}</td>
                      <td className="p-3 font-bold text-rose-600">₹{o.amount}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-stone-300 text-xs font-semibold focus:outline-none"
                        >
                          <option value="Ordered">1. Ordered</option>
                          <option value="Making">2. Making (Studio)</option>
                          <option value="Packed">3. Packed</option>
                          <option value="Shipped">4. Shipped</option>
                          <option value="Delivered">5. Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Inventory */}
        {adminTab === 'inventory' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-800">Catalog Product Stock & Crafting Lead Times:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((p) => (
                <div key={p.id} className="p-3 rounded-xl border border-stone-200 flex items-center justify-between bg-stone-50">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 truncate max-w-xs">{p.title}</h4>
                      <span className="text-[10px] text-stone-500 font-semibold">Craft Time: {p.craftTime}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    In Stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
