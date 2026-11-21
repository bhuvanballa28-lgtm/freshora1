import React from 'react';

export default function ProductCard({ product, quantityInCart, onAddToCart, onUpdateQuantity, onOpenSpecs }) {
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div
      onClick={() => onOpenSpecs(product)}
      className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.badge && (
            <span className={`${product.badgeColor || 'bg-emerald-600'} text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-amber-500 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Dietary Pill */}
        <div className="absolute top-2.5 right-2.5">
          <span className="bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-emerald-100 flex items-center space-x-1">
            <span>🌱</span>
            <span>{product.dietary}</span>
          </span>
        </div>

        {/* Hover Hint */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
            <span>👁️</span>
            <span>Click to View Specs</span>
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-extrabold text-emerald-700 tracking-wide uppercase text-[11px]">
              {product.brand}
            </span>
            <span className="text-slate-400 font-medium">
              {product.weight}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center space-x-1 mt-1.5 text-xs">
            <div className="flex items-center text-amber-500">
              <span>★</span>
              <span className="font-bold text-slate-800 ml-1">{product.rating}</span>
            </div>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart Controls */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-black text-slate-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block font-medium">Inclusive of all taxes</span>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            {quantityInCart === 0 ? (
              <button
                onClick={(e) => onAddToCart(product, e)}
                className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl text-xs font-extrabold border border-emerald-200 hover:border-emerald-600 transition flex items-center space-x-1"
              >
                <span>+</span>
                <span>ADD</span>
              </button>
            ) : (
              <div className="flex items-center bg-emerald-600 text-white rounded-xl p-0.5 shadow-sm">
                <button
                  onClick={(e) => onUpdateQuantity(product.id, -1, e)}
                  className="w-7 h-7 flex items-center justify-center font-black text-sm hover:bg-emerald-700 rounded-lg active:scale-95 transition"
                  title="Decrease quantity"
                >
                  -
                </button>
                <span className="w-6 text-center text-xs font-black">
                  {quantityInCart}
                </span>
                <button
                  onClick={(e) => onUpdateQuantity(product.id, 1, e)}
                  className="w-7 h-7 flex items-center justify-center font-black text-sm hover:bg-emerald-700 rounded-lg active:scale-95 transition"
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
