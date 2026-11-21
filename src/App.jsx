import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS } from './data/products.js';
import Navbar from './components/Navbar.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductSpecsModal from './components/ProductSpecsModal.jsx';
import CartModal from './components/CartModal.jsx';
import OrderConfirmationModal from './components/OrderConfirmationModal.jsx';

export default function App() {
  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Cart State: { [productId]: quantity }
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [activeProductForSpecs, setActiveProductForSpecs] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart Handlers
  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    triggerToast(`Added ${product.brand} ${product.name} to cart!`);
  };

  const handleUpdateQuantity = (productId, delta, e) => {
    if (e) e.stopPropagation();
    setCart(prev => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const handleRemoveItem = (productId) => {
    setCart(prev => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    triggerToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart({});
    triggerToast('Cart cleared');
  };

  // Derived Values
  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const prod = PRODUCTS.find(p => p.id === id);
      return { ...prod, quantity: qty };
    }).filter(item => item && item.id);
  }, [cart]);

  const totalItemsCount = useMemo(() => {
    return Object.values(cart).reduce((sum, q) => sum + q, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const totalSavings = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const diff = (item.originalPrice || item.price) - item.price;
      return sum + (diff * item.quantity);
    }, 0);
  }, [cartItems]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      if (selectedDietary !== 'all') {
        if (selectedDietary === 'Vegetarian' && !prod.dietary.includes('Vegetarian') && !prod.dietary.includes('Vegan')) return false;
        if (selectedDietary === 'Vegan' && !prod.dietary.includes('Vegan')) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchBrand = prod.brand.toLowerCase().includes(q);
        const matchCategory = prod.category.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [selectedCategory, selectedDietary, searchQuery, sortBy]);

  // Place Order Handler with mandatory SMS bill
  const handlePlaceOrder = ({ customerName, customerPhone, customerAddress, includeBag, bagFee, finalTotal }) => {
    if (totalItemsCount === 0) return;
    setIsPlacingOrder(true);

    setTimeout(() => {
      const orderNum = 'FR-' + Math.floor(1000 + Math.random() * 9000);
      const orderDetails = {
        orderNumber: orderNum,
        kioskId: 'Kiosk Station #04 - In-Store Lane',
        items: [...cartItems],
        subtotal,
        bagFee,
        total: finalTotal,
        totalSavings,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        counter: 'Counter 2 (Express Pick & Bag)'
      };

      setPlacedOrder(orderDetails);
      setCart({});
      setIsCartOpen(false);
      setIsPlacingOrder(false);
      triggerToast(`Order ${orderNum} confirmed! Mandatory SMS bill dispatched to +91 ${customerPhone.trim()}`);
    }, 1100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2 border border-slate-700 animate-slideUp">
          <span className="text-emerald-400">🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalItemsCount={totalItemsCount}
        subtotal={subtotal}
        onOpenCart={() => setIsCartOpen(true)}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedDietary={selectedDietary}
        onSelectDietary={setSelectedDietary}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
      />

      {/* In-Store Greeting & Announcement Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>FRESHORA In-Store Self-Ordering Terminal #04</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight pt-1">
              Welcome to FRESHORA • 100% Genuine Branded Groceries
            </h1>
            <p className="text-xs text-emerald-200/90 max-w-2xl leading-relaxed">
              Select items from our shelves below, tap on any product to inspect specifications, add them to your cart, and enter your details to receive your <strong>SMS bill mandatorily</strong> upon placing the order.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs shrink-0">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center space-x-2">
              <span className="text-emerald-400 text-base">🛡️</span>
              <div>
                <p className="font-bold">Original Brands</p>
                <p className="text-[10px] text-emerald-200">Kellogg's, Amul, Tata...</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center space-x-2">
              <span className="text-emerald-400 text-base">📱</span>
              <div>
                <p className="font-bold">Mandatory SMS Bill</p>
                <p className="text-[10px] text-emerald-200">Sent instantly on order</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Listing */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
              <span>
                {selectedCategory === 'all' ? 'All Grocery Products' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </span>
              <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                {filteredProducts.length} items
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              💡 <strong>Tip:</strong> Click on any product card to open its specifications popup (ingredients, nutrition facts, shelf life).
            </p>
          </div>

          {searchQuery && (
            <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center space-x-2">
              <span>Searching for: <strong>"{searchQuery}"</strong></span>
              <button onClick={() => setSearchQuery('')} className="text-emerald-600 font-bold hover:underline">Clear</button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-lg font-bold text-slate-800">No matching branded products found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try resetting filters or searching for popular brands like Kellogg's, Amul, Quaker, or Barilla.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedDietary('all'); }}
              className="mt-4 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={cart[product.id] || 0}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
                onOpenSpecs={setActiveProductForSpecs}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Cart Button for Quick Access */}
      {totalItemsCount > 0 && (
        <aside aria-label="Floating cart action" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 sm:hidden">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-3 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full shadow-2xl shadow-emerald-700/50 border border-emerald-400 font-extrabold text-sm active:scale-95 transition"
          >
            <span>🛒</span>
            <span>View Cart ({totalItemsCount})</span>
            <span>•</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </button>
        </aside>
      )}

      {/* Specifications Popup (When customer clicks an item) */}
      <ProductSpecsModal
        product={activeProductForSpecs}
        quantityInCart={activeProductForSpecs ? (cart[activeProductForSpecs.id] || 0) : 0}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClose={() => setActiveProductForSpecs(null)}
      />

      {/* Cart & SMS Checkout Popup (When customer clicks cart icon) */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        totalItemsCount={totalItemsCount}
        subtotal={subtotal}
        totalSavings={totalSavings}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        isPlacingOrder={isPlacingOrder}
      />

      {/* Order Confirmation Receipt Modal (Shows token & mandatory SMS bill preview) */}
      <OrderConfirmationModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      {/* Store Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900">FRESHORA Supermarket</span>
            <span>• In-Store Customer Self-Ordering System</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Fast & Digital Billing</span>
            <span>•</span>
            <span>100% Genuine Branded Groceries</span>
            <span>•</span>
            <span>Customer Desk: Ext. 101</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
