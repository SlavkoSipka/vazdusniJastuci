// EmailJS service configuration
import emailjs from '@emailjs/browser';

// EmailJS configuration - will be set from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface ContactFormData {
  name: string;
  phone: string;
  marka: string;
  vin: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Check if EmailJS is properly configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS configuration missing');
      return false;
    }

    // Initialize EmailJS with public key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Prepare template parameters matching your EmailJS template
    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      marka: formData.marka,
      vin: formData.vin,
      message: formData.message,
      // Template će automatski poslati na email koji ste konfigurirali u EmailJS
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email uspešno poslat:', response);
    return true;
  } catch (error) {
    console.error('Greška pri slanju email-a:', error);
    return false;
  }
};