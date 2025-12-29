import React, { useState } from 'react';
import { sendContactEmail, ContactFormData } from '../utils/emailService';

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    marka: '',
    vin: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.marka) {
      alert('Molimo unesite ime, telefon i marku automobila.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await sendContactEmail(formData);
      
      if (success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          marka: '',
          vin: '',
          message: ''
        });
        
        // Show success message for 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-black border-2 border-zinc-700 p-10 shadow-2xl ${className}`}>
      <h3 className="text-3xl font-black text-white mb-8 text-center uppercase tracking-wide">
        Pošaljite upit
      </h3>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-600 border border-green-500 text-white text-center font-semibold">
          ✅ Vaš upit je uspešno poslat! Javićemo vam se uskoro.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-600 border border-red-500 text-white text-center font-semibold">
          ❌ Greška pri slanju upita. Molimo pokušajte ponovo ili nas pozovite.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Vaše ime *"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-zinc-900 border-2 border-zinc-700 text-white placeholder-zinc-400 px-4 py-4 focus:outline-none focus:border-red-600 transition-colors duration-300 font-medium"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Broj telefona *"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="bg-zinc-900 border-2 border-zinc-700 text-white placeholder-zinc-400 px-4 py-4 focus:outline-none focus:border-red-600 transition-colors duration-300 font-medium"
          />
        </div>
        <input
          type="text"
          name="marka"
          placeholder="Marka i model automobila *"
          value={formData.marka}
          onChange={handleInputChange}
          required
          className="w-full bg-zinc-900 border-2 border-zinc-700 text-white placeholder-zinc-400 px-4 py-4 focus:outline-none focus:border-red-600 transition-colors duration-300 font-medium"
        />
        <input
          type="text"
          name="vin"
          placeholder="Broj šasije (VIN)"
          value={formData.vin}
          onChange={handleInputChange}
          className="w-full bg-zinc-900 border-2 border-zinc-700 text-white placeholder-zinc-400 px-4 py-4 focus:outline-none focus:border-red-600 transition-colors duration-300 font-medium"
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Opišite potreban deo (naziv, kataloški broj, godina proizvodnje...)"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full bg-zinc-900 border-2 border-zinc-700 text-white placeholder-zinc-400 px-4 py-4 focus:outline-none focus:border-red-600 resize-none transition-colors duration-300 font-medium"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`relative w-full px-8 py-5 font-black text-lg uppercase tracking-wide overflow-hidden group transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-600/25 ${
            isSubmitting 
              ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:text-red-600'
          }`}
        >
          <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
          <span className="relative z-10 transition-colors duration-300">
            {isSubmitting ? 'Šalje se...' : 'Pošaljite upit'}
          </span>
        </button>
      </form>
      
      <p className="text-zinc-400 text-sm mt-4 text-center">
        * Obavezna polja
      </p>
    </div>
  );
};

export default ContactForm;