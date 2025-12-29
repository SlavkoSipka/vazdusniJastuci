import React, { useState } from 'react';
import { Star, ArrowRight, Phone, Mail, MapPin, Car } from 'lucide-react';
import AutoPartsPage from './components/AutoPartsPage';
import ProductsPage from './components/ProductsPage';
import ProjectCaseStudyPage from './components/ProjectCaseStudyPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ProductCard from './components/ProductCard';
import ContactForm from './components/ContactForm';
import { useLoading } from './hooks/useLoading';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { products } from './data/products';
import { carBrands } from './data/carBrands';
import { VisibilityState } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAutoPartsPage, setShowAutoPartsPage] = useState(false);
  const [showProductsPage, setShowProductsPage] = useState(false);
  const [showCaseStudyPage, setShowCaseStudyPage] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('SVE');
  const [pageLoading, setPageLoading] = useState(false);
  
  const isLoading = useLoading(2300);
  
  const initialVisibilityState: VisibilityState = {
    hero: false,
    brands: false,
    products: false,
    features: false,
    contact: false
  };
  
  const { isVisible, setRef } = useIntersectionObserver(initialVisibilityState);

  const handlePageChange = (callback: () => void) => {
    setPageLoading(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setPageLoading(false);
      }, 2300);
    }, 100);
  };

  const scrollToProducts = () => {
    handlePageChange(() => setShowProductsPage(true));
  };

  const navigateToBrand = (brandName: string) => {
    setSelectedBrand(brandName);
    handlePageChange(() => setShowProductsPage(true));
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading || pageLoading) {
    return <LoadingScreen />;
  }

  if (showAutoPartsPage) {
    return <AutoPartsPage onBack={() => handlePageChange(() => setShowAutoPartsPage(false))} />;
  }

  if (showProductsPage) {
    return <ProductsPage 
      onBack={() => handlePageChange(() => setShowProductsPage(false))} 
      initialBrand={selectedBrand}
    />;
  }

  if (showCaseStudyPage) {
    return <ProjectCaseStudyPage onBack={() => handlePageChange(() => setShowCaseStudyPage(false))} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onProductsClick={scrollToProducts}
        onAutoPartsClick={() => handlePageChange(() => setShowAutoPartsPage(true))}
        onBrandClick={navigateToBrand}
        onContactClick={scrollToContact}
      />

      {/* Hero Section */}
      <section 
        ref={setRef('hero')}
        data-section="hero"
        itemScope
        itemType="https://schema.org/AutoPartsStore"
        className={`relative py-20 overflow-hidden transition-all duration-500 bg-cover bg-center bg-no-repeat ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-90 translate-y-4'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://aislike.rs/Jastuci/734241.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="mb-8">
              <span className={`inline-block bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider shadow-lg transition-all duration-300 delay-100 ${
                isVisible.hero 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-80 translate-y-2'
              }`}>
                #1 U SRBIJI
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none transition-all duration-500 delay-200 ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-90 translate-y-4'
            }`}
            itemProp="name">
              VAZDUŠNI JASTUCI ZA PUTNIČKA VOZILA
              <span className="block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
                LIMUZINE • SUV • DŽIPOVI
              </span>
            </h1>
            
            <p className={`text-lg text-zinc-200 mb-8 max-w-3xl mx-auto font-medium leading-relaxed transition-all duration-500 delay-300 ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-80 translate-y-2'
            }`}
            itemProp="description">
              <span className="text-white font-semibold">Originalni vazdušni jastuci za putnička vozila</span> - limuzine, SUV i džipove. BMW X5, Mercedes ML, Audi Q7, Land Rover.<br/>
              <span className="text-red-400">Rešite probleme sa suspenzijom • Brza dostava • Garancija kvaliteta</span>
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-500 delay-400 ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-80 translate-y-2'
            }`}>
              <button 
                onClick={scrollToProducts}
                className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 overflow-hidden group transition-all duration-300 hover:text-red-600 shadow-xl hover:shadow-red-600/25 transform hover:scale-105"
              >
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 transition-colors duration-300">
                  POGLEDAJ PROIZVODE
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-colors duration-300" />
              </button>
              
              <button 
                onClick={scrollToContact}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 font-bold text-lg uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                KONTAKTIRAJ NAS
              </button>
            </div>
          </div>
          
          {/* Statistics */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-500 delay-500 ${
            isVisible.hero 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-80 translate-y-2'
          }`}>
            {[
              { number: '5+', text: 'Marki automobila', delay: 600 },
              { number: '48h', text: 'Brza isporuka', delay: 650 },
              { number: '500+', text: 'Zadovoljnih kupaca', delay: 700 }
            ].map((stat, index) => (
              <div key={index} className={`text-center transition-all duration-300 delay-${stat.delay} ${
                isVisible.hero 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-80 translate-y-2'
              }`}>
                <div className="text-3xl font-black text-red-600 mb-2">{stat.number}</div>
                <div className="text-zinc-300 font-semibold uppercase tracking-wide text-sm">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section 
        ref={setRef('brands')}
        data-section="brands"
        className="py-16 bg-zinc-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight relative z-10">
                MARKE AUTOMOBILA
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600"></div>
            </div>
            <p className="text-zinc-400 text-lg font-medium">Vazdušni jastuci za sve popularne marke</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {carBrands.map((brand) => (
              <div
                key={brand.name}
                className="bg-black border border-zinc-800 hover:border-red-600 group cursor-pointer transition-all duration-300 transform hover:scale-105"
                onClick={() => navigateToBrand(brand.name.toUpperCase())}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className={`w-full h-full object-cover group-hover:opacity-80 transition-opacity ${
                      brand.name === 'Mercedes' ? 'scale-150' : ''
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-black text-white text-lg mb-1">{brand.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section 
        id="products-section" 
        ref={setRef('products')}
        data-section="products"
        className="pt-2 pb-20 bg-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <h2 className={`text-4xl font-black text-white mb-4 tracking-tight relative z-10 transition-all duration-500 ${
                isVisible.products 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-90 translate-y-2'
              }`}>
                POPULARNI PROIZVODI
              </h2>
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 transition-all duration-500 delay-100 ${
                isVisible.products 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-80 scale-x-50'
              }`}></div>
            </div>
            <p className={`text-zinc-400 text-lg font-medium transition-all duration-500 delay-200 ${
              isVisible.products 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-80 translate-y-2'
            }`}>Najtraženiji vazdušni jastuci</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isVisible={isVisible.products}
                delay={300 + index * 50}
              />
            ))}
          </div>
          
          <div className={`text-center mt-12 transition-all duration-500 delay-800 ${
            isVisible.products 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-80 translate-y-2'
          }`}>
            <button 
              onClick={scrollToProducts}
              className="bg-white text-black hover:bg-zinc-200 px-8 py-4 font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Vidi sve proizvode
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={setRef('features')}
        data-section="features"
        className="py-20 bg-zinc-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Car, title: 'Originalni delovi', desc: 'Svi vazdušni jastuci su originalni ili kompatibilni sa originalnim specifikacijama.', delay: 100 },
              { icon: Star, title: 'Garancija kvaliteta', desc: 'Pružamo garanciju na sve proizvode i profesionalnu podršku.', delay: 200 },
              { icon: ArrowRight, title: 'Brza dostava', desc: 'Dostava u roku od 24-48h na teritoriji cele Srbije.', delay: 300 }
            ].map((feature, index) => (
              <div key={index} className={`text-center transition-all duration-500 delay-${feature.delay} ${
                isVisible.features 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-80 translate-y-2'
              }`}>
                <div className="bg-red-600 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-zinc-400 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact-section"
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
          <h2 className={`text-4xl font-black text-white mb-6 tracking-tight transition-all duration-500 ${
            isVisible.contact 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-90 translate-y-2'
          }`}>
            KONTAKTIRAJTE NAS
          </h2>
          <div className={`w-24 h-1 bg-black mx-auto mb-6 transition-all duration-500 delay-100 ${
            isVisible.contact 
              ? 'opacity-100 scale-x-100' 
              : 'opacity-80 scale-x-50'
          }`}></div>
          <p className={`text-red-100 text-lg mb-12 font-medium transition-all duration-500 delay-200 ${
            isVisible.contact 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-80 translate-y-2'
          }`}>
            Pošaljite nam upit sa specifikacijom potrebnog dela i mi ćemo vam se javiti sa ponudom
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Phone, title: 'Telefon', value: '061 418 8988', desc: 'Pozovite nas radnim danima\n08:00 - 20:00h', delay: 300 },
              { icon: Mail, title: 'Email', value: 'info@vazdusnijastuci.rs', desc: 'Pošaljite nam upit\nOdgovaramo u roku od 2h', delay: 350 },
              { icon: MapPin, title: 'Lokacija', value: 'Beograd, Srbija', desc: 'Dostava na teritoriji\ncele Srbije', delay: 400 }
            ].map((contact, index) => (
              <div 
                key={index} 
                className={`bg-black border-2 border-zinc-700 hover:border-red-600 hover:bg-red-600 p-6 text-center group transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-600/25 ${
                isVisible.contact 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-80 translate-y-2'
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
          
          <ContactForm className={`transition-all duration-500 delay-500 ${
            isVisible.contact 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-80 translate-y-2'
          }`} />
        </div>
      </section>

      <Footer onCaseStudyClick={() => handlePageChange(() => setShowCaseStudyPage(true))} />
    </div>
  );
}

export default App;