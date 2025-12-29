import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img 
              src="https://aislike.rs/Jastuci/logo2.png" 
              alt="Vazdušni Jastuci Logo" 
              className="h-32 sm:h-40 md:h-48 w-auto"
            />
          </div>
          <p className="text-zinc-400 mb-6 font-medium text-sm sm:text-base lg:text-lg px-4">
            Vaš pouzdan partner za vazdušne jastuke i auto delove
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm mb-6">
            <a href="#" className="text-zinc-400 hover:text-red-600 font-semibold uppercase tracking-wide transition-colors">
              Politika privatnosti
            </a>
            <a href="#" className="text-zinc-400 hover:text-red-600 font-semibold uppercase tracking-wide transition-colors">
              Uslovi korišćenja
            </a>
            <a href="#" className="text-zinc-400 hover:text-red-600 font-semibold uppercase tracking-wide transition-colors">
              Kontakt
            </a>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm px-4">
            Website by{' '}
            <a 
              href="https://aisajt.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-500 font-semibold transition-colors"
            >
              Aisajt.com
            </a>
            {' • '}
            <span itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">Vazdušni Jastuci Srbija</span>
              <span className="hidden" itemProp="telephone">+381614188988</span>
              <span className="hidden" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="addressLocality">Beograd</span>
                <span itemProp="addressCountry">RS</span>
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;