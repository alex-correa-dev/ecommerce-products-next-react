'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../../icons/Icons';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isProductPage = pathname?.startsWith('/products/');
  const productName = isProductPage ? 'Produto' : '';

  return (
    <header className="bg-gray-100 lg:bg-white lg:rounded-full w-full shadow-sm sticky top-0 z-50 lg:mt-5">
      <div className="container mx-auto px-4">
        <div className="hidden lg:flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/vercel.svg"
                alt="Ice Dreams Logo"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <DesktopNav />
          </div>
          <div className="flex items-center gap-4">
            <button
              aria-label="User account"
              className="hover:opacity-80 transition-opacity"
            >
              <Icons.FaUser size={20} />
            </button>
            <button
              aria-label="Shopping cart"
              className="hover:opacity-80 transition-opacity"
            >
              <Icons.FaShoppingCart size={20} />
            </button>
          </div>
        </div>

        <div className="lg:hidden flex items-center justify-between py-4">
          <MobileNav
            isProductPage={isProductPage}
            productName={productName}
            onMenuClick={() => setIsMenuOpen(true)}
          />
          <div className="flex items-center gap-4">
            <button
              aria-label="Shopping cart"
              className="hover:opacity-80 transition-opacity"
            >
              <Icons.FaShoppingCart size={20} />
            </button>
            <button
              aria-label="Menu"
              onClick={() => setIsMenuOpen(true)}
              className="hover:opacity-80 transition-opacity"
            >
              <Icons.FaBars size={20} />
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
}
