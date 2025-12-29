import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, ArrowLeft } from 'lucide-react';
import { carBrands } from '../data/carBrands';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
  onProductsClick?: () => void;
  onAutoPartsClick?: () => void;
  onBrandClick?: (brand: string) => void;
  onContactClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  searchTerm = '',
  setSearchTerm,
  onBack,
  showBackButton = false,
  onProductsClick,
  onAutoPartsClick,
  onBrandClick,
  onContactClick
}) => {
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close desktop dropdown on click outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBrandsDropdownOpen(false);
      }
      // Only close mobile dropdown on click outside
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileBrandsOpen(false);
      }
    };

    // Only add click outside listener on desktop
    if (window.innerWidth >= 768) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrandClick = (brandName: string) => {
    setIsBrandsDropdownOpen(false);
    setIsMobileBrandsOpen(false);
    setIsMenuOpen(false);
    onBrandClick?.(brandName);
  };

  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="https://aislike.rs/Jastuci/logo2.png" 
              alt="Vazdušni Jastuci Logo" 
              className="h-36 w-auto max-w-none"
            />
          </div>

          {/* Desktop Navigation */}
          {!showBackButton && (
            <>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="#" className="text-white hover:text-red-600 font-semibold text-sm uppercase tracking-wide transition-colors">Početna</a>
                  {onProductsClick && (
                    <button onClick={onProductsClick} className="text-zinc-400 hover:text-red-600 font-semibold text-sm uppercase tracking-wide transition-colors">Proizvodi</button>
                  )}
                  {onBrandClick && (
                    <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsBrandsDropdownOpen(!isBrandsDropdownOpen)}
                      className="text-zinc-400 hover:text-red-600 font-semibold text-sm uppercase tracking-wide transition-colors flex items-center gap-1"
                    >
                      Marke
                      <svg className={`w-4 h-4 transition-transform ${isBrandsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isBrandsDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-red-600 border border-red-500 shadow-2xl z-50">
                        <div className="py-2">
                          {carBrands.map((brand) => (
                            <button
                              key={brand.name}
                              className="block w-full px-4 py-3 text-white hover:bg-red-700 font-semibold text-sm uppercase tracking-wide transition-colors border-b border-red-500 last:border-b-0 text-left"
                              onClick={() => {
                                handleBrandClick(brand.name.toUpperCase());
                              }}
                            >
                              <div className="flex justify-between items-center">
                                <span>{brand.name}</span>
                                <span className="text-red-200 text-xs">{brand.models} modela</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    </div>
                  )}
                  {onAutoPartsClick && (
                    <button 
                      onClick={onAutoPartsClick}
                      className="text-zinc-400 hover:text-red-600 font-semibold text-sm uppercase tracking-wide transition-colors"
                    >
                      Auto delovi
                    </button>
                  )}
                  <a href="#" className="text-zinc-400 hover:text-red-600 font-semibold text-sm uppercase tracking-wide transition-colors">Kontakt</a>
                </div>
              </div>

              {/* Search Bar */}
              {setSearchTerm && (
                <div className="hidden md:flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Pretraži proizvode..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-zinc-900 border border-zinc-700 text-white pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-red-600 text-sm"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Back Button */}
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="relative flex items-center gap-2 bg-zinc-800 hover:bg-red-600 text-white px-4 py-3 font-bold text-sm uppercase tracking-wide overflow-hidden group transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Nazad</span>
            </button>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-white block px-3 py-2 font-semibold text-sm uppercase tracking-wide">Početna</a>
            {onProductsClick && (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onProductsClick();
                }} 
                className="text-zinc-400 hover:text-red-600 block px-3 py-2 font-semibold text-sm uppercase tracking-wide transition-colors w-full text-left"
              >
                Proizvodi
              </button>
            )}
            
            {/* Mobile Brands Dropdown */}
            {onBrandClick && (
              <div className="relative" ref={mobileDropdownRef}>
              <button 
                onClick={() => setIsMobileBrandsOpen(!isMobileBrandsOpen)}
                className="text-zinc-400 hover:text-red-600 block px-3 py-2 font-semibold text-sm uppercase tracking-wide transition-colors w-full text-left flex items-center justify-between"
              >
                Marke
                <svg className={`w-4 h-4 transition-transform ${isMobileBrandsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isMobileBrandsOpen && (
                <div className="bg-red-600 ml-4 mt-1 border border-red-500">
                  {carBrands.map((brand) => (
                    <button
                      key={brand.name}
                      className="block w-full px-4 py-3 text-white hover:bg-red-700 font-semibold text-sm uppercase tracking-wide transition-colors border-b border-red-500 last:border-b-0 text-left"
                      onClick={() => handleBrandClick(brand.name.toUpperCase())}
                    >
                      <div className="flex justify-between items-center">
                        <span>{brand.name}</span>
                        <span className="text-red-200 text-xs">{brand.models} modela</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              </div>
            )}
            
            {onAutoPartsClick && (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onAutoPartsClick();
                }}
                className="text-zinc-400 hover:text-red-600 block px-3 py-2 font-semibold text-sm uppercase tracking-wide transition-colors w-full text-left"
              >
                Auto delovi
              </button>
            )}
            {onContactClick ? (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onContactClick();
                }}
                className="text-zinc-400 hover:text-red-600 block px-3 py-2 font-semibold text-sm uppercase tracking-wide transition-colors w-full text-left"
              >
                Kontakt
              </button>
            ) : (
              <a href="#" className="text-zinc-400 hover:text-red-600 block px-3 py-2 font-semibold text-sm uppercase tracking-wide transition-colors">Kontakt</a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;