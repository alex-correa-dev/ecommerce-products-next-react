import { Product } from '@/services/types';

export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}
