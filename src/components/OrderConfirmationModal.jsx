import React from 'react';

export default function OrderConfirmationModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-scaleUp">
        {/* Banner */}
        <div className="bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-700 p-6 text-center text-white relative">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-3xl mb-3 shadow-inner">
            ✓
          </div>
          <h3 className="text-2xl font-black tracking-tight">Order Placed Successfully!</h3>
          <p className="text-xs text-emerald-100 mt-1 font-medium">
            Thank you for shopping at FRESHORA Branded Groceries
          </p>

          {/* Token Display */}
          <div className="mt-4 bg-white text-slate-900 py-3 px-6 rounded-2xl shadow-xl inline-block border border-emerald-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Your In-Store Pickup Token
            </span>
            <span className="text-2xl font-black text-emerald-700 tracking-wider">
              {order.orderNumber}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto custom-scrollbar">
          
          {/* SIMULATED SMS BILL NOTIFICATION CARD */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md border border-slate-700 relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-base">💬</span>
                <span className="font-bold text-slate-200">SMS Bill Dispatched</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-1.5 py-0.5 rounded">
                  MANDATORY SMS SENT
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Just now</span>
            </div>

            <div className="mt-3 bg-slate-800/80 rounded-xl p-3 border border-slate-700 text-xs space-y-1.5 font-mono">
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Sender: <strong className="text-emerald-400">FRESHORA-BILL</strong></span>
                <span>To: <strong className="text-slate-200">+91 {order.customerPhone}</strong></span>
              </div>
              <p className="text-slate-100 leading-relaxed text-[11.5px] pt-1">
                "Dear <span className="text-emerald-300 font-bold">{order.customerName}</span>, your FRESHORA grocery order <span className="text-emerald-300 font-bold">{order.orderNumber}</span> for <span className="text-emerald-300 font-bold">₹{order.total.toLocaleString()}</span> is confirmed! 
                Billing Address: <span className="text-slate-300">{order.customerAddress}</span>. 
                Your digital invoice link: <span className="text-cyan-400 underline">https://freshora.shop/inv/{order.orderNumber}</span>. 
                Please collect at Counter 2 using Token <span className="text-amber-400 font-bold">{order.orderNumber}</span>. Thank you!"
              </p>
              <div className="flex items-center space-x-1 text-[10px] text-emerald-400 pt-1">
                <span>✓✓</span>
                <span>Delivered via SMS to +91 {order.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* In-Store Counter Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-amber-900">
            <span className="text-2xl shrink-0">🏪</span>
            <div>
              <p className="font-extrabold text-sm">Collect at Express Counter 2</p>
              <p className="text-amber-800 mt-0.5 leading-relaxed">
                Our in-shop bagging team is assembling your branded products. Please approach the collection bay in <strong>3-5 minutes</strong> and present your Token <strong>{order.orderNumber}</strong> or SMS message.
              </p>
            </div>
          </div>

          {/* Customer & Billing Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Customer Name</span>
              <span className="font-bold text-slate-800">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Mobile (SMS Verified)</span>
              <span className="font-bold text-slate-800">+91 {order.customerPhone}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Billing / Delivery Address</span>
              <span className="font-medium text-slate-800 block mt-0.5">{order.customerAddress}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Order Time</span>
              <span className="font-bold text-slate-800">{order.timestamp}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Kiosk Station</span>
              <span className="font-bold text-slate-800">{order.kioskId}</span>
            </div>
          </div>

          {/* Itemized Breakdown */}
          <div>
            <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
              Itemized Grocery Breakdown ({order.items.reduce((s, i) => s + i.quantity, 0)} items)
            </h5>
            <div className="divide-y divide-slate-100 text-xs border border-slate-200 rounded-2xl p-3 bg-white">
              {order.items.map(item => (
                <div key={item.id} className="py-2.5 flex justify-between items-center first:pt-0 last:pb-0">
                  <div className="flex-1 pr-3">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block">{item.brand}</span>
                    <span className="font-bold text-slate-800 block leading-tight">{item.name}</span>
                    <span className="text-slate-400 text-[10px]">{item.weight} • Qty: {item.quantity} × ₹{item.price}</span>
                  </div>
                  <span className="font-black text-slate-900 text-sm">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Total Summary */}
          <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-slate-800">₹{order.subtotal.toLocaleString()}</span>
            </div>
            {order.totalSavings > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>In-Store Savings Discount</span>
                <span>- ₹{order.totalSavings.toLocaleString()}</span>
              </div>
            )}
            {order.bagFee > 0 && (
              <div className="flex justify-between">
                <span>Eco-Friendly Bag</span>
                <span className="font-bold text-slate-800">₹{order.bagFee}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Taxes (GST Included)</span>
              <span>₹{Math.round(order.subtotal * 0.05).toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
              <span>Total Paid</span>
              <span className="text-xl text-emerald-700">₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <span>🖨️</span>
            <span>Print Tax Invoice</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center space-x-1.5"
          >
            <span>🛍️</span>
            <span>Place Another Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
