import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MessageCircle, Phone, MapPin, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const reduced = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      // Fallback to mailto
      const subject = encodeURIComponent(`Inquiry from ${formData.name} (${formData.company || 'Individual'})`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:jindalsonslimited@gmail.com?subject=${subject}&body=${body}`;
      setStatus('success');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again or email us directly.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again or email us directly.');
    }
  };

  const slideLeft = {
    hidden: { x: reduced ? 0 : -24, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: reduced ? 0 : 0.5 } },
  };

  const slideRight = {
    hidden: { x: reduced ? 0 : 24, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: reduced ? 0 : 0.5 } },
  };

  return (
    <section id="contact" className="py-24 bg-background" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 id="contact-heading" className="section-heading">Start the Conversation</h2>
          <p className="section-sub max-w-2xl mx-auto">
            Ready to establish your regional operations? Get in touch with our Hong Kong corporate desk.
          </p>
        </div>

        {/* Form + Coordinates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 bg-white p-8 rounded-2xl border border-border shadow-card"
          >
            <h3 className="font-semibold text-primary text-xl mb-6">Send an Inquiry</h3>
            
            {status === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl flex items-start gap-4">
                <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Inquiry Sent Successfully</h4>
                  <p className="text-sm">Thank you for contacting Jindalsons Limited. Our corporate advisory desk will review your requirements and respond within one business day.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center gap-3 text-sm">
                    <AlertCircle className="text-red-600 flex-shrink-0" size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Hem Jindal"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-primary mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Jindalsons Limited"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="client@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="+852 9351 1790"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">
                    Your Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="input w-full resize-none"
                    placeholder="Describe your company formation, taxation strategy, or listing requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full py-4 text-center disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Coordinates Side */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white p-8 rounded-2xl border border-border shadow-card space-y-6">
              <h3 className="font-semibold text-primary text-xl mb-2">Office Coordinates</h3>
              
              <div className="flex items-start gap-4">
                <User className="text-gold mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted-fg font-medium">Primary Contact</span>
                  <span className="text-primary font-medium text-base">Hem Jindal</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-gold mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted-fg font-medium">Email Desk</span>
                  <a
                    href="mailto:jindalsonslimited@gmail.com"
                    className="text-accent hover:underline text-base font-medium"
                  >
                    jindalsonslimited@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MessageCircle className="text-gold mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted-fg font-medium">WhatsApp / Direct Line</span>
                  <a
                    href="https://wa.me/85293511790"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline text-base font-medium block"
                  >
                    +852 9351 1790
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-gold mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted-fg font-medium">Alternative Contact</span>
                  <a
                    href="tel:+85293511790"
                    className="text-primary hover:underline text-base font-medium"
                  >
                    +852 9351 1790
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-gold mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted-fg font-medium">Office Hours</span>
                  <span className="text-primary text-base font-medium">Mon–Fri, 09:00–18:00 HKT</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-gold mt-1 flex-shrink-0" size={20} aria-hidden="true" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted-fg font-medium">Hong Kong Office Address</span>
                  <a
                    href="https://maps.google.com/?q=Unit+No.+87,+Basement+1+Floor+(Lower+G/F),+Houston+Centre,+No.+63+Mody+Road,+Tsim+Sha+Tsui,+Kowloon,+Hong+Kong"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline text-sm leading-relaxed block font-medium mt-1"
                  >
                    Unit No. 87, Basement 1 Floor (Lower G/F), Houston Centre, No. 63 Mody Road, Tsim Sha Tsui, Kowloon, Hong Kong
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
