import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ToolGrid from '@/components/ToolGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col bg-transparent [background:none]">
      <Navbar />
      <div className="flex flex-1 flex-col items-center">
        <Hero />
        <ToolGrid />
      </div>
      <Footer />
    </main>
  );
}
