import React from 'react';
import Header from './components/Header';
import HeroVideoScrub from './components/HeroVideoScrub';
import WhyHongKong from './components/WhyHongKong';
import Services from './components/Services';
import Formation from './components/Formation';
import Advantages from './components/Advantages';
import Values from './components/Values';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-white">
      {/* Header Navigation */}
      <Header />

      {/* Main Sections */}
      <main className="flex-grow">
        <HeroVideoScrub />
        <WhyHongKong />
        <Services />
        <Formation />
        <Advantages />
        <Values />
        <Contact />
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}
