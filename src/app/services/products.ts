import { api } from './api';
import type { Product } from './types';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    return api.get<Product[]>('/products');
  },
  
  getProductById: async (id: string): Promise<Product> => {
    return api.get<Product>(`/products/${id}`);
  },
};