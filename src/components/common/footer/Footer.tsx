import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-orange-500 text-black hidden lg:block mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-shrink-0">
            <Image
              src="/vercel.svg"
              alt="Ice Dreams Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="font-bold text-center">
              Acompanhe nossas redes sociais:
            </span>
            <div className="flex gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-black my-6"></div>

        <div className="text-center md:text-left">
          <p className="text-sm">
            Ice Dreams @ 2026 *{' '}
            <Link href="/politica-privacidade" className="underline hover:opacity-80 transition-opacity">
              Política de Privacidade
            </Link>{' '}
            *{' '}
            <Link href="/termos-uso" className="underline hover:opacity-80 transition-opacity">
              Termos de Uso
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
