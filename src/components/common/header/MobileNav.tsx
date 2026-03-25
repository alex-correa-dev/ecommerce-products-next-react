import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '../../icons/Icons';

interface MobileNavProps {
  isProductPage: boolean;
  productName: string;
  onMenuClick?: () => void;
}

export function MobileNav({ isProductPage, productName, onMenuClick }: MobileNavProps) {
  if (isProductPage) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
          aria-label="Go back"
        >
          <Icons.FaArrowLeft size={20} />
        </Link>
        <span className="font-medium truncate max-w-[200px]">
          {productName}
        </span>
      </div>
    );
  }

  return (
    <Link href="/" className="flex-shrink-0" onClick={onMenuClick}>
      <Image
        src="/vercel.svg"
        alt="Ice Dreams Logo"
        width={100}
        height={50}
        className="h-10 w-auto"
      />
    </Link>
  );
}
