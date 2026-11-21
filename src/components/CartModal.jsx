import React, { useState } from 'react';

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  totalItemsCount,
  subtotal,
  totalSavings,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  isPlacingOrder
}) {
  const [includeBag, setIncludeBag] = useState(true);
  
  // Mandatory Customer Info for SMS Bill
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen) return null;

  const bagFee = includeBag && totalItemsCount > 0 ? 10 : 0;
  const finalTotal = subtotal + bagFee;

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.customerPhone = 'Mobile number is required for SMS bill';
    } else if (cleanPhone.length !== 10) {
      newErrors.customerPhone = 'Please enter a valid 10-digit mobile number';
    }
    if (!customerAddress.trim()) {
      newErrors.customerAddress = 'Address is required for your bill record';
    }
    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors(errs);
  };

  const handleOrderClick = (e) => {
    e.preventDefault();
    setTouched({ customerName: true, customerPhone: true, customerAddress: true });
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    if (totalItemsCount === 0) return;

    onPlaceOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      includeBag,
      bagFee,
      finalTotal
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
              🛒
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black tracking-tight">Your FRESHORA Cart</h3>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  In-Store Kiosk
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected • Digital SMS Bill Ready
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs text-emerald-100 hover:text-white font-bold px-2.5 py-1 rounded-lg hover:bg-white/10 transition"
              >
                Clear Cart
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-sm transition"
              title="Close cart popup"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Cart Empty State */}
          {cartItems.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-4xl mb-4 text-slate-300">
                🛒
              </div>
              <h4 className="text-lg font-extrabold text-slate-800">Your cart is currently empty</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Browse our aisles of branded groceries, tap <strong>ADD</strong> on items you wish to purchase, and review them here.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition"
              >
                Start Adding Groceries
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    Selected Items ({totalItemsCount})
                  </h4>
                  <span className="text-xs text-emerald-700 font-bold">
                    Subtotal: ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3.5 p-3 rounded-2xl border border-slate-200/80 hover:border-emerald-300 bg-slate-50/60 transition"
                    >
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 bg-white"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">
                          {item.brand}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 truncate">
                          {item.name}
                        </h5>
                        <span className="text-[11px] text-slate-500 block font-medium">
                          {item.weight} • ₹{item.price} each
                        </span>
                        <span className="text-xs font-black text-slate-900 mt-0.5 block">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm shrink-0">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center font-black text-slate-700 hover:bg-slate-100 rounded-lg text-sm transition active:scale-95"
                          title="Decrease"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-extrabold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center font-black text-slate-700 hover:bg-slate-100 rounded-lg text-sm transition active:scale-95"
                          title="Increase"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition text-sm shrink-0"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eco Bag Option */}
              <div className="flex items-center justify-between text-xs bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80">
                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeBag}
                    onChange={(e) => setIncludeBag(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-slate-800 font-bold block">Add Eco-Friendly FRESHORA Bag</span>
                    <span className="text-[11px] text-emerald-700">Biodegradable heavy-duty bag for your groceries</span>
                  </div>
                </label>
                <span className="font-extrabold text-slate-800 text-sm">₹10</span>
              </div>

              {/* MANDATORY CUSTOMER DETAILS FOR SMS BILL */}
              <div className="bg-gradient-to-br from-amber-50/80 to-emerald-50/50 p-4 sm:p-5 rounded-2xl border-2 border-emerald-300 shadow-sm space-y-3.5">
                {/* Banner notice */}
                <div className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <span className="text-xl shrink-0">📱</span>
                  <div>
                    <span className="font-extrabold text-emerald-900 block text-xs uppercase tracking-wide">
                      Mandatory Customer Details for SMS Bill
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      As per FRESHORA in-store digital billing policy, your <strong>tax invoice</strong>, <strong>itemized receipt</strong>, and <strong>order pickup token</strong> will be sent on SMS to the given phone number mandatorily.
                    </p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-3 pt-2">
                  {/* Name field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-800">
                        Customer Full Name <span className="text-rose-500 font-black">*</span>
                      </label>
                      {touched.customerName && errors.customerName && (
                        <span className="text-[11px] text-rose-600 font-bold">{errors.customerName}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.customerName) setErrors(prev => ({ ...prev, customerName: null }));
                      }}
                      onBlur={() => handleBlur('customerName')}
                      className={`w-full px-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border focus:outline-none transition ${
                        touched.customerName && errors.customerName
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                          : 'border-slate-300 focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-800">
                        Phone Number (For SMS Bill) <span className="text-rose-500 font-black">*</span>
                      </label>
                      {touched.customerPhone && errors.customerPhone && (
                        <span className="text-[11px] text-rose-600 font-bold">{errors.customerPhone}</span>
                      )}
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-500 pointer-events-none">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="10-digit mobile number (e.g. 9876543210)"
                        value={customerPhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setCustomerPhone(val);
                          if (errors.customerPhone) setErrors(prev => ({ ...prev, customerPhone: null }));
                        }}
                        onBlur={() => handleBlur('customerPhone')}
                        className={`w-full pl-14 pr-3.5 py-2.5 bg-white text-xs text-slate-900 rounded-xl border focus:outline-none transition font-medium tracking-wide ${
                          touched.customerPhone && errors.customerPhone
                            ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                            : 'border-slate-300 focus:ring-2 focus:ring-emerald-500'
                        }`}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      ⚡ The bill will be sent on SMS on the given number mandatorily.
                    </p>
                  </div>

                  {/* Address field */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-800">
                        Address (Billing / Delivery) <span className="text-rose-500 font-black">*</span>
                      </label>
                      {touched.customerAddress && errors.customerAddress && (
                        <span className="text-[11px] text-rose-600 font-bold">{errors.customerAddress}</span>
                      )}
                    </div>
                    <textarea
                      rows="2"
                      placeholder="e.g. Flat 302, Green Meadows Apt, Sector 4, Bangalore"
                      value={customerAddress}
                      onChange={(e) => {
                        setCustomerAddress(e.target.value);
                        if (errors.customerAddress) setErrors(prev => ({ ...prev, customerAddress: null }));
                      }}
                      onBlur={() => handleBlur('customerAddress')}
                      className={`w-full px-3.5 py-2 bg-white text-xs text-slate-900 rounded-xl border focus:outline-none transition ${
                        touched.customerAddress && errors.customerAddress
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500'
                          : 'border-slate-300 focus:ring-2 focus:ring-emerald-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-slate-800">₹{subtotal.toLocaleString()}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>FRESHORA In-Store Savings</span>
                    <span>- ₹{totalSavings.toLocaleString()}</span>
                  </div>
                )}
                {includeBag && (
                  <div className="flex justify-between text-slate-600">
                    <span>Carry Bag Fee</span>
                    <span className="font-bold text-slate-800">₹10</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>GST (Included in Product Prices)</span>
                  <span>₹{Math.round(subtotal * 0.05).toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                  <span>Total Amount Payable</span>
                  <span className="text-xl text-emerald-700">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer / Place Order Button */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-2.5">
            <button
              type="button"
              onClick={handleOrderClick}
              disabled={isPlacingOrder || totalItemsCount === 0}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/30 text-sm tracking-wide transition flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.99] cursor-pointer"
            >
              {isPlacingOrder ? (
                <>
                  <span className="animate-spin text-lg">⏳</span>
                  <span>Transmitting Order & Sending SMS Bill...</span>
                </>
              ) : (
                <>
                  <span>⚡</span>
                  <span>Place Order • ₹{finalTotal.toLocaleString()}</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-500 font-medium">
              Clicking <strong>Place Order</strong> will immediately transmit your order to the packing bay and trigger your mandatory SMS bill.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
