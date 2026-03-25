'use client';

import { useProducts } from '../../hooks/useProducts';
import { ProductList } from './ProductList';

export function ProductsContainer() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <ProductList
      products={products || []}
      isLoading={isLoading}
      error={error}
    />
  );
}
