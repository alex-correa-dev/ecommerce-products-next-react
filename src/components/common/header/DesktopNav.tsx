import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'O início' },
  { href: '/products', label: 'Produtos' },
  { href: '/about', label: 'Quem somos' },
  { href: '/contact', label: 'Contato' },
];

export function DesktopNav() {
  return (
    <nav className="flex gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-orange-500 transition-colors font-medium"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
