import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

import Services from './components/Services';
import Stats from './components/Stats';
import SecuritySection from './components/SecuritySection';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-primary selection:text-white">
      {/* Fixed Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Landing with Dashboard Preview URL bar & Audit Logs table */}
        <Hero />

        
        {/* 3-Column Core Modules Services Grid */}
        <Services />
        
        {/* KPI stats counter section */}
        <Stats />
        
        {/* Cert Checklist and Security policy toggles */}
        <SecuritySection />
        
        {/* HK Corporate Setup FAQ Accordion */}
        <Faq />
        
        {/* Centered B2B Call to Action panel */}
        <Cta />
        
        {/* Office coordinates and email/phone inquiry form */}
        <Contact />
      </main>

      {/* 6-Column Footer with System status online pulsing dot */}
      <Footer />
    </div>
  );
}
