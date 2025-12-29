import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import ProductCard from './ProductCard';
import ContactForm from './ContactForm';
import { useLoading } from '../hooks/useLoading';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { products } from '../data/products';
import { ProductsVisibilityState } from '../types';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ProductsPageProps {
  onBack: () => void;
  initialBrand?: string;
  contact: boolean;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onBack, initialBrand = 'SVE' }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isLoading = useLoading(2300);
  
  const initialVisibilityState: ProductsVisibilityState = {
    hero: false,
    filters: false,
    products: false,
    contact: false
  };
  
  const { isVisible, setRef } = useIntersectionObserver(initialVisibilityState);

  const brands = ['SVE', 'BMW', 'MERCEDES', 'AUDI', 'PORSCHE', 'LAND ROVER'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesBrand = selectedBrand === 'SVE' || product.brand === selectedBrand;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.model.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [selectedBrand, searchTerm]);

  if (isLoading) {
    return <LoadingScreen message="Učitavanje proizvoda..." />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onBrandClick={(brand) => {
          setSelectedBrand(brand);
          // Scroll to top when brand changes
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onBack={onBack}
        showBackButton={true}
      />

      {/* Hero Section */}
      <section 
        ref={setRef('hero')}
        data-section="hero"
        className={`relative py-20 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.pexels.com/photos/1537462715879-360eeb61a0ad/photo-1537462715879-360eeb61a0ad.jpeg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-6xl font-black text-white mb-6 tracking-tight transition-all duration-1000 delay-300 ${
            isVisible.hero 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}>
            VAZDUŠNI JASTUCI ZA PUTNIČKA VOZILA
            <span className="block text-red-600">LIMUZINE • SUV • DŽIPOVI</span>
          </h1>
          <p className={`text-lg text-zinc-300 mb-8 max-w-3xl mx-auto font-medium transition-all duration-1000 delay-500 ${
            isVisible.hero 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            Originalni vazdušni jastuci za suspenziju putničkih vozila - limuzine, SUV i džipove. BMW X5, Mercedes ML, Audi Q7, Land Rover, Porsche. Rešite probleme sa oslanjanjem vašeg vozila.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section 
        ref={setRef('filters')}
        data-section="filters"
        className="py-8 bg-zinc-950 border-b border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row justify-between items-center gap-6 transition-all duration-1000 ${
            isVisible.filters 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {/* Brand Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-zinc-400 font-semibold text-sm uppercase tracking-wide mr-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Marke:
              </span>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                    selectedBrand === brand
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* View Mode & Results */}
            <div className="flex items-center gap-4">
              <span className="text-zinc-400 text-sm font-medium">
                {filteredProducts.length} proizvoda
              </span>
              
              <div className="flex bg-zinc-800 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section 
        ref={setRef('products')}
        data-section="products"
        className="py-16 bg-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">Nema rezultata</h3>
              <p className="text-zinc-400">Pokušajte sa drugim pojmom pretrage ili izaberite drugu marku.</p>
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-6'
            }`}>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  isVisible={isVisible.products}
                  delay={200 + index * 100}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={setRef('contact')}
        data-section="contact"
        className="py-20 bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden"
      >
        {/* Background Images */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute left-0 top-0 w-96 h-full bg-contain bg-no-repeat bg-left opacity-100"
            style={{
              backgroundImage: `url('https://aislike.rs/Jastuci/suspension.png')`
            }}
          />
          <div 
            className="absolute right-0 top-0 w-96 h-full bg-contain bg-no-repeat bg-right opacity-100"
            style={{
              backgroundImage: `url('https://aislike.rs/Jastuci/suspension.png')`
            }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl font-black text-white mb-6 tracking-tight transition-all duration-1000 ${
            isVisible.contact 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            KONTAKTIRAJTE NAS
          </h2>
          <div className={`w-24 h-1 bg-black mx-auto mb-6 transition-all duration-1000 delay-200 ${
            isVisible.contact 
              ? 'opacity-100 scale-x-100' 
              : 'opacity-0 scale-x-0'
          }`}></div>
          <p className={`text-red-100 text-lg mb-12 font-medium transition-all duration-1000 delay-300 ${
            isVisible.contact 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Pošaljite nam upit sa specifikacijom potrebnog dela i mi ćemo vam se javiti sa ponudom
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Phone, title: 'Telefon', value: '061 418 8988', desc: 'Pozovite nas radnim danima\n08:00 - 20:00h', delay: 400 },
              { icon: Mail, title: 'Email', value: 'info@vazdusnijastuci.rs', desc: 'Pošaljite nam upit\nOdgovaramo u roku od 2h', delay: 500 },
              { icon: MapPin, title: 'Lokacija', value: 'Beograd, Srbija', desc: 'Dostava na teritoriji\ncele Srbije', delay: 600 }
            ].map((contact, index) => (
              <div 
                key={index} 
                className={`bg-black border-2 border-zinc-700 hover:border-red-600 hover:bg-red-600 p-6 text-center group transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-600/25 ${
                isVisible.contact 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              } ${contact.icon === Phone ? 'cursor-pointer' : ''}`} 
                style={{ transitionDelay: isVisible.contact ? `${contact.delay}ms` : '0ms' }}
                onClick={() => contact.icon === Phone && window.open('tel:0614188988', '_self')}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-600 group-hover:bg-black transition-colors duration-150">
                  <contact.icon className="w-8 h-8 text-white transition-colors duration-150" />
                </div>
                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">{contact.title}</h3>
                <p className="text-red-400 font-bold text-lg">{contact.value}</p>
                <p className="text-zinc-300 text-sm mt-2 whitespace-pre-line">{contact.desc}</p>
              </div>
            ))}
          </div>
          
          <ContactForm className={`transition-all duration-1000 delay-700 ${
            isVisible.contact 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;