import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buttonLinkClass } from '@/lib/buttonClasses';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
        <p className="text-muted mb-2 text-sm font-medium uppercase tracking-widest">404</p>
        <h1 className="text-heading mb-4 text-4xl font-bold sm:text-5xl">Página no encontrada</h1>
        <p className="text-muted mb-8 max-w-md text-lg">
          La ruta que buscas no existe o fue movida.
        </p>
        <Link href="/" className={buttonLinkClass('primary', 'px-8 py-3 text-base')}>
          Volver al inicio
        </Link>
      </div>
      <Footer />
    </main>
  );
}
