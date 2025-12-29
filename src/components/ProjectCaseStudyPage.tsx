import React, { useState, useEffect } from 'react';
import { ArrowLeft, Code, Palette, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import { useLoading } from '../hooks/useLoading';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ProjectCaseStudyPageProps {
  onBack: () => void;
}

const ProjectCaseStudyPage: React.FC<ProjectCaseStudyPageProps> = ({ onBack }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoading = useLoading(2300);
  
  const initialVisibilityState = {
    hero: false,
    overview: false,
    benefits: false,
    conclusion: false
  };
  
  const { isVisible, setRef } = useIntersectionObserver(initialVisibilityState);

  useEffect(() => {
    // Update document title
    document.title = 'O Projektu | Vazdušni Jastuci Srbija';

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://vazdusnijastuci.rs/o-projektu');

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Case study projekta Vazdušni Jastuci Srbija - kako je razvijen moderni web sajt sa fokusom na performanse, SEO optimizaciju i korisničko iskustvo.');

    return () => {
      // Reset canonical on unmount (optional)
      document.title = 'Vazdušni Jastuci za Putnička Vozila | Limuzine, SUV, Džipovi | BMW, Mercedes, Audi';
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onBack={onBack}
        showBackButton={true}
      />

      {/* Hero Section */}
      <section 
        ref={setRef('hero')}
        className={`relative py-20 bg-gradient-to-b from-zinc-900 to-black transition-all duration-500 ${
          isVisible.hero 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-90 translate-y-4'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl md:text-5xl font-black text-white mb-6 tracking-tight transition-all duration-500 delay-200 ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-90 translate-y-4'
            }`}>
              O Projektu
            </h1>
            <div className={`w-24 h-1 bg-red-600 mx-auto mb-8 transition-all duration-500 delay-300 ${
              isVisible.hero 
                ? 'opacity-100 scale-x-100' 
                : 'opacity-80 scale-x-50'
            }`}></div>
            <p className={`text-zinc-400 text-lg font-medium transition-all duration-500 delay-400 ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-80 translate-y-2'
            }`}>
              Kako je razvijen sajt za prodaju vazdušnih jastuka
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section 
        ref={setRef('overview')}
        className="py-16 bg-black"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`prose prose-invert prose-lg max-w-none transition-all duration-500 ${
            isVisible.overview 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-80 translate-y-4'
          }`}>
            <h2 className="text-3xl font-black text-white mb-6">O klijentu i projektu</h2>
            
            <p className="text-zinc-300 mb-6 leading-relaxed text-lg">
              Vazdušni Jastuci Srbija je specijalizovana prodavnica koja se fokusira na distribuciju originalnih 
              i kompatibilnih vazdušnih jastuka za premium marke automobila. Kompanija je prepoznata na tržištu 
              zahvaljujući širokom asortimanu delova za BMW, Mercedes, Audi, Land Rover i Porsche vozila.
            </p>

            <p className="text-zinc-300 mb-6 leading-relaxed text-lg">
              Glavni cilj projekta bio je kreiranje moderne, visokoperformantne web platforme koja će omogućiti 
              klijentima da jednostavno pronađu potrebne delove za svoja vozila. Sajt je trebalo da kombinuje 
              intuitivan korisnički interfejs sa naprednom funkcionalnošću pretrage i filtriranja proizvoda.
            </p>

            <h2 className="text-3xl font-black text-white mb-6 mt-12">Tehnički pristup razvoju</h2>

            <p className="text-zinc-300 mb-6 leading-relaxed text-lg">
              Za implementaciju sajta korišćen je React uz TypeScript, što je omogućilo kreiranje robustne i 
              skalabilne aplikacije. Frontend je razvijen koristeći Vite build tool, koji garantuje brzu 
              kompilaciju i optimalne performanse. Dizajn je realizovan pomoću Tailwind CSS frameworka, 
              omogućavajući responsive pristup koji odlično funkcioniše na svim uređajima.
            </p>

            <p className="text-zinc-300 mb-6 leading-relaxed text-lg">
              Jedan od ključnih aspekata projekta bilo je uključivanje naprednih SEO tehnika. Timovi iz 
              <a 
                href="https://aisajt.com" 
                className="text-red-600 hover:text-red-500 font-semibold transition-colors"
              >
                AiSajt tim
              </a>
              {' '}su implementirali struktuirane podatke (Schema.org markup), optimizovane meta tagove i 
              tehničku SEO konfiguraciju koja poboljšava vidljivost sajta u pretraživačima. Dodatno je 
              integrisana tehnička optimizacija koja ubrzava učitavanje stranica i poboljšava Core Web Vitals metrike.
            </p>

            <h2 className="text-3xl font-black text-white mb-6 mt-12">Dizajn i korisničko iskustvo</h2>

            <p className="text-zinc-300 mb-6 leading-relaxed text-lg">
              Dizajn sajta je kreiran sa fokusom na jednostavnost i profesionalnost. Tamna tema sa akcentnim 
              crvenim bojama odgovara brand identitetu kompanije i stvara vizuelnu povezanost sa automobilskim 
              industrijom. Navigacija je optimizovana tako da korisnici mogu brzo da pronađu proizvode po markama, 
              modelima ili kategorijama.
            </p>

            <p className="text-zinc-300 mb-6 leading-relaxed text-lg">
              Implementirane su interaktivne animacije i smooth scroll efekti koji poboljšavaju user experience, 
              dok su sve kritične sekcije optimizovane za mobilne uređaje. Forma za kontakt je povezana sa 
              EmailJS servisom, omogućavajući direktnu komunikaciju bez potrebe za backend infrastrukturom.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={setRef('benefits')}
        className="py-16 bg-zinc-950"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-black text-white mb-12 text-center transition-all duration-500 ${
            isVisible.benefits 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-90 translate-y-2'
          }`}>
            Konkretni rezultati i benefite
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: 'Brzo učitavanje',
                desc: 'Vite build tool i optimizovani assets omogućavaju učitavanje stranica u manje od 2 sekunde.',
                delay: 100
              },
              {
                icon: TrendingUp,
                title: 'Poboljšana vidljivost',
                desc: 'SEO optimizacija je rezultirala boljim pozicijama u Google pretraživanjima relevantnih ključnih reči.',
                delay: 200
              },
              {
                icon: CheckCircle,
                title: 'Povećane konverzije',
                desc: 'Intuitivan dizajn i jednostavna navigacija su značajno povećali broj upita i narudžbina.',
                delay: 300
              },
              {
                icon: Code,
                title: 'Moderni tech stack',
                desc: 'Korišćenje najnovijih tehnologija garantuje dugoročnu održivost i lakoću održavanja.',
                delay: 400
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className={`bg-black border border-zinc-800 p-6 hover:border-red-600 transition-all duration-300 transform hover:scale-105 ${
                  isVisible.benefits 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-80 translate-y-4'
                }`}
                style={{ transitionDelay: isVisible.benefits ? `${benefit.delay}ms` : '0ms' }}
              >
                <div className="bg-red-600 w-12 h-12 mb-4 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{benefit.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section 
        ref={setRef('conclusion')}
        className="py-16 bg-black"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`prose prose-invert prose-lg max-w-none transition-all duration-500 ${
            isVisible.conclusion 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-80 translate-y-4'
          }`}>
            <h2 className="text-3xl font-black text-white mb-6">Zaključak</h2>
            
            <p className="text-zinc-300 mb-6 leading-relaxed text-lg">
              Projekat Vazdušni Jastuci Srbija predstavlja uspešnu kombinaciju moderne web tehnologije, 
              naprednih SEO tehnika i fokusa na korisničko iskustvo. Implementacija je rezultirala sajtom 
              koji ne samo da izgleda profesionalno, već i odlično funkcioniše u pretraživačima, što je 
              ključno za online uspeh kompanije.
            </p>

            <p className="text-zinc-300 mb-6 leading-relaxed text-lg">
              Struktura projekta omogućava jednostavno dodavanje novih proizvoda i funkcionalnosti u 
              budućnosti, dok su optimizacije performansi osigurale brzo iskustvo za sve korisnike, 
              bez obzira na njihovu lokaciju ili uređaj koji koriste.
            </p>

            <div className="mt-12 p-6 bg-zinc-900 border-l-4 border-red-600">
              <p className="text-zinc-300 text-lg leading-relaxed">
                Za više informacija o{' '}
                <a 
                  href="https://aisajt.com/izrada-sajtova" 
                  className="text-red-600 hover:text-red-500 font-semibold transition-colors"
                >
                  web dizajn i razvoj
                </a>
                {' '}usluga i profesionalnom pristupu kreiranju modernih web platformi, kontaktirajte naš tim.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectCaseStudyPage;

