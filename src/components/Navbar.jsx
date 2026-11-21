import React from 'react';

export default function Navbar({
  searchQuery,
  onSearchChange,
  totalItemsCount,
  subtotal,
  onOpenCart,
  categories,
  selectedCategory,
  onSelectCategory,
  selectedDietary,
  onSelectDietary,
  sortBy,
  onSelectSortBy
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Brand & Search & Cart Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => { onSelectCategory('all'); onSearchChange(''); }}
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-emerald-500/20">
            F
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900">FRESH<span className="text-emerald-600">ORA</span></span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded">GROCERY</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Branded Grocery Self-Service</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-base">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by brand (Kellogg's, Amul, Barilla) or item..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Cart Icon Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenCart}
            className={`relative flex items-center space-x-2.5 px-4 py-2.5 rounded-xl font-bold transition shadow-sm ${
              totalItemsCount > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 ring-2 ring-emerald-500/30'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Open Cart Popup"
          >
            <span className="text-lg">🛒</span>
            <div className="text-left hidden sm:block">
              <span className="text-xs block font-semibold leading-none">Your Cart</span>
              <span className="text-sm font-extrabold leading-tight">₹{subtotal.toLocaleString()}</span>
            </div>
            {totalItemsCount > 0 && (
              <span className="ml-1 bg-amber-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Strip & Filters */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 overflow-x-auto custom-scrollbar">
          <div className="flex items-center space-x-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 pl-4 border-l border-slate-200 text-xs">
            <select
              value={selectedDietary}
              onChange={(e) => onSelectDietary(e.target.value)}
              className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Diets</option>
              <option value="Vegetarian">🌱 Vegetarian</option>
              <option value="Vegan">🥑 Vegan Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value)}
              className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="popular">Popularity</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
