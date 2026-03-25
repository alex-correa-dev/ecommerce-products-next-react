'use client';

import { ProductListProps } from './types';
import { ProductCard } from './ProductCard';
import { ProductListSkeleton } from './ProductListSkeleton';
import { ProductListEmpty } from './ProductListEmpty';
import { ProductListError } from './ProductListError';

export function ProductList({ products, isLoading, error }: ProductListProps) {
  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (error) {
    return <ProductListError error={error} />;
  }

  if (!products || products.length === 0) {
    return <ProductListEmpty />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
