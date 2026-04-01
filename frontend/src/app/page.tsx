import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ToolGrid from '@/components/ToolGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col min-h-screen text-white relative bg-transparent">

      <Navbar />
      <div className="flex-1 flex flex-col items-center">
        <Hero />
        <ToolGrid />
      </div>
      <Footer />
    </main>
  );
}
