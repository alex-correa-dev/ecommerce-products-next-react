import { useEffect } from 'react';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/', label: 'O início' },
  { href: '/products', label: 'Produtos' },
  { href: '/about', label: 'Quem somos' },
  { href: '/contact', label: 'Contato' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
        onClick={onClose}
      />
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg z-50 lg:hidden">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="hover:opacity-80 transition-opacity"
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-2 hover:text-orange-500 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
