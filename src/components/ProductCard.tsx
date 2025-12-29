import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  isVisible?: boolean;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  viewMode = 'grid', 
  isVisible = true, 
  delay = 0 
}) => {
  return (
    <div
      itemScope
      itemType="https://schema.org/Product"
      className={`bg-zinc-900 border border-zinc-800 hover:border-red-600 group transition-all duration-300 transform hover:scale-105 ${
        viewMode === 'list' ? 'flex gap-6 p-6' : ''
      } ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-80 translate-y-4'
      }`}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionDuration: '300ms'
      }}
    >
      {product.popular && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide absolute z-10 m-4 shadow-lg">
          POPULARAN
        </div>
      )}
      
      <div className={`${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'} overflow-hidden relative flex-shrink-0`}>
        <img
          src={product.image}
          alt={product.name}
          itemProp="image"
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <span className="text-red-600 font-bold text-sm uppercase tracking-wide">Nema na stanju</span>
          </div>
        )}
      </div>
      
      <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-red-600 text-white px-2 py-1 font-bold text-xs uppercase tracking-wide">{product.brand}</span>
          <span className="text-zinc-500 text-sm">•</span>
          <span className="text-zinc-400 text-sm">{product.model}</span>
        </div>
        
        <h3 className={`font-bold text-white mb-3 leading-tight ${
          viewMode === 'list' ? 'text-xl' : 'text-lg h-12 flex items-start'
        }`}
        itemProp="name">
          {product.name}
        </h3>
        
        <div itemProp="brand" itemScope itemType="https://schema.org/Brand" className="hidden">
          <span itemProp="name">{product.brand}</span>
        </div>
        
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
          <span itemProp="price">{product.price}</span>
          <span itemProp="priceCurrency">RSD</span>
          <span itemProp="availability" content={product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"}></span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex flex-col items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-white font-semibold text-sm mt-1">{product.rating}</span>
          </div>
          {viewMode === 'grid' && (
            <span className="text-zinc-400 text-sm ml-auto">({product.reviews} recenzija)</span>
          )}
        </div>
        
        <button
          disabled={!product.inStock}
          onClick={() => product.inStock && window.open('tel:0614188988', '_self')}
          className={`w-full py-3 font-bold text-sm uppercase tracking-wide transition-colors ${
            product.inStock
              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200'
              : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'POZOVI' : 'Nema na stanju'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;