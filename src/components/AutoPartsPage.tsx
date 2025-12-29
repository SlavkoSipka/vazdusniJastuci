import React from 'react';
import { Phone, Mail, MapPin, Wrench, Shield, Clock, CheckCircle } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import ContactForm from './ContactForm';
import { useLoading } from '../hooks/useLoading';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { AutoPartsVisibilityState } from '../types';

interface AutoPartsPageProps {
  onBack: () => void;
}

const AutoPartsPage: React.FC<AutoPartsPageProps> = ({ onBack }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoading = useLoading(2300);
  
  const initialVisibilityState: AutoPartsVisibilityState = {
    hero: false,
    features: false,
    services: false,
    contact: false
  };
  
  const { isVisible, setRef } = useIntersectionObserver(initialVisibilityState);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onBrandClick={() => {
          // On auto parts page, brand click could navigate back to products
          // or we can just ignore it since this page is about general auto parts
        }}
        onBack={onBack}
        showBackButton={true}
      />

      {/* Hero Section with Background */}
      <section 
        ref={setRef('hero')}
        data-section="hero"
        className={`relative py-32 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1600')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-5xl md:text-7xl font-black text-white mb-6 tracking-tight transition-all duration-1000 delay-300 ${
            isVisible.hero 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}>
            VAZDUŠNI JASTUCI ZA PUTNIČKA VOZILA
            <span className="block text-red-600">LIMUZINE • SUV • DŽIPOVI</span>
          </h1>
          <p className={`text-xl text-zinc-300 mb-8 max-w-3xl mx-auto font-medium transition-all duration-1000 delay-500 ${
            isVisible.hero 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            Specijalizovani za vazdušne jastuke i pneumatsku suspenziju putničkih vozila - limuzine, SUV i džipove. Rešavamo probleme sa oslanjanjem BMW, Mercedes, Audi, Land Rover vozila. 
            Originalni delovi, brza dostava, stručna podrška.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={setRef('features')}
        data-section="features"
        className="py-20 bg-zinc-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <h2 className={`text-4xl font-black text-white mb-4 tracking-tight relative z-10 transition-all duration-1000 ${
                isVisible.features 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                ZAŠTO IZABRATI NAS
              </h2>
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 transition-all duration-1000 delay-200 ${
                isVisible.features 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: '100% Originalni', desc: 'Svi delovi su originalni ili OEM kvaliteta sa garancijom proizvođača.', delay: 200 },
              { icon: Clock, title: 'Brza nabavka', desc: 'Nabavljamo delove u roku od 3-7 dana, zavisno od dostupnosti.', delay: 300 },
              { icon: Wrench, title: 'Sve marke', desc: 'Nabavljamo delove za sve marke i modele automobila.', delay: 400 },
              { icon: CheckCircle, title: 'Garancija', desc: 'Pružamo garanciju na sve delove i profesionalnu podršku.', delay: 500 }
            ].map((feature, index) => (
              <div key={index} className={`text-center transition-all duration-1000 delay-${feature.delay} ${
                isVisible.features 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
                <div className="bg-red-600 w-20 h-20 mx-auto mb-6 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:shadow-lg hover:shadow-red-600/50">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-zinc-400 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={setRef('services')}
        data-section="services"
        className="py-20 bg-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <h2 className={`text-4xl font-black text-white mb-4 tracking-tight relative z-10 transition-all duration-1000 ${
                isVisible.services 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                NAŠE USLUGE
              </h2>
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 transition-all duration-1000 delay-200 ${
                isVisible.services 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`bg-zinc-900 border border-zinc-800 hover:border-red-600 hover:bg-red-600 p-8 group transition-all duration-150 transform hover:scale-105 hover:shadow-xl hover:shadow-red-600/25 ${
              isVisible.services 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`} style={{ transitionDelay: isVisible.services ? '200ms' : '0ms' }}>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Nabavka delova</h3>
              <ul className="space-y-3 text-zinc-300">
                {[
                  'Motorna ulja i filteri',
                  'Kočnice i diskovi',
                  'Amortizeri i opruge',
                  'Delovi motora',
                  'Električni delovi'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-red-600 group-hover:text-black flex-shrink-0 transition-colors duration-150" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={`bg-zinc-900 border border-zinc-800 hover:border-red-600 hover:bg-red-600 p-8 group transition-all duration-150 transform hover:scale-105 hover:shadow-xl hover:shadow-red-600/25 ${
              isVisible.services 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`} style={{ transitionDelay: isVisible.services ? '400ms' : '0ms' }}>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Dodatne usluge</h3>
              <ul className="space-y-3 text-zinc-300">
                {[
                  'Konsultacije o delovima',
                  'Provera kompatibilnosti',
                  'Dostava na adresu',
                  'Preporuke servisa',
                  'Tehnička podrška'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-red-600 group-hover:text-black flex-shrink-0 transition-colors duration-150" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

export default AutoPartsPage;