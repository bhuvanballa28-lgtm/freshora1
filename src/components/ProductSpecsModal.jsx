import React from 'react';

export default function ProductSpecsModal({ product, quantityInCart, onAddToCart, onUpdateQuantity, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wide">
              {product.brand}
            </span>
            <span className="text-xs text-slate-500 font-medium">Official Product Specification</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center text-sm font-bold border border-slate-200 transition"
            title="Close specifications"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* Top Product Summary */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-48 h-48 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-slate-200 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow uppercase">
                  {product.badge}
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">{product.brand}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">{product.weight}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-emerald-600 font-semibold">{product.dietary}</span>
              </div>
              
              <h3 className="text-xl font-extrabold text-slate-900 mt-1 leading-snug">
                {product.name}
              </h3>

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                <div className="flex items-center bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg font-bold border border-amber-200">
                  <span>★ {product.rating}</span>
                  <span className="text-amber-600 font-normal ml-1">({product.reviewsCount} reviews)</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg font-semibold border border-emerald-200">
                  ✓ In Stock ({product.stockCount} units on shelf)
                </span>
              </div>

              {/* Price box & Cart buttons */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    You save ₹{product.originalPrice - product.price} on this purchase
                  </span>
                </div>

                {/* Add to cart from modal */}
                <div>
                  {quantityInCart > 0 ? (
                    <div className="flex items-center bg-emerald-600 text-white rounded-xl p-1 shadow">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="w-8 h-8 flex items-center justify-center font-black hover:bg-emerald-700 rounded-lg text-sm active:scale-95"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold">
                        {quantityInCart}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="w-8 h-8 flex items-center justify-center font-black hover:bg-emerald-700 rounded-lg text-sm active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center space-x-1.5 active:scale-95"
                    >
                      <span>🛒</span>
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">Product Description</h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {product.specifications.description}
            </p>
          </div>

          {/* Nutritional Information Grid */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Nutritional Facts</span>
              <span className="text-slate-500 font-medium lowercase">Per {product.specifications.nutrition.servingSize}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Energy</span>
                <span className="font-extrabold text-slate-800 text-sm">{product.specifications.nutrition.energy}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Protein</span>
                <span className="font-extrabold text-slate-800 text-sm">{product.specifications.nutrition.protein}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Carbohydrates</span>
                <span className="font-extrabold text-slate-800 text-sm">{product.specifications.nutrition.carbs}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Sugars</span>
                <span className="font-extrabold text-slate-800 text-sm">{product.specifications.nutrition.sugars}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Fat</span>
                <span className="font-extrabold text-slate-800 text-sm">{product.specifications.nutrition.fat}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Sodium</span>
                <span className="font-extrabold text-slate-800 text-sm">{product.specifications.nutrition.sodium}</span>
              </div>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Key Specifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Ingredients</span>
                <span className="text-slate-800 font-medium leading-tight mt-0.5 block">{product.specifications.ingredients}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Shelf Life</span>
                <span className="text-slate-800 font-semibold mt-0.5 block">{product.specifications.shelfLife}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Storage Instructions</span>
                <span className="text-slate-800 font-medium mt-0.5 block">{product.specifications.storageInstructions}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Country of Origin</span>
                <span className="text-slate-800 font-semibold mt-0.5 block">{product.specifications.countryOfOrigin}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">FSSAI / Safety License & Manufacturer</span>
                <span className="text-slate-800 font-medium mt-0.5 block">
                  Lic: #{product.specifications.fssaiLicense} • {product.specifications.manufacturer}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium flex items-center space-x-1">
            <span>🛡️</span>
            <span>100% Genuine Branded Product • FRESHORA Guarantee</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
}
