import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/products';
import type { Product } from '../services/types';

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
  });
};
