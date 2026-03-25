'use client';

import Image from 'next/image';
import { useProduct } from '../../app/hooks/useProduct';
import { ProductSkeleton } from './ProductSkeleton';
import { ProductError } from './ProductError';
import { Typography } from '../ui/Typography';
import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';
import { Button } from '../ui/Button';
import { FaStar } from 'react-icons/fa';

interface ProductDetailsProps {
  productId: string;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <ProductError error={error} />;
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <Typography variant="h6" className="text-gray-500">
          Produto não encontrado
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <div>
        <Typography
          variant="h4"
          component="h1"
          className="font-bold mb-4 text-gray-900"
        >
          {product.title}
        </Typography>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`${
                  index < Math.floor(product.rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                size={18}
              />
            ))}
          </div>
          <Typography variant="body2" className="text-gray-600">
            ({product.rating.count} avaliações)
          </Typography>
        </div>

        <Typography
          variant="body2"
          className="text-orange-500 font-semibold mb-2"
        >
          {product.category}
        </Typography>

        <Typography
          variant="h5"
          className="text-3xl font-bold text-orange-600 mb-6"
        >
          R$ {product.price.toFixed(2)}
        </Typography>

        <Typography
          variant="body1"
          className="text-gray-700 mb-8 leading-relaxed"
        >
          {product.description}
        </Typography>

        <Card className="bg-gray-50">
          <CardContent>
            <Typography variant="subtitle1" className="font-semibold mb-2">
              Informações adicionais
            </Typography>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Categoria:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Avaliação média:</span>
                <span className="font-medium">{product.rating.rate} / 5</span>
              </div>
              <div className="flex justify-between">
                <span>Total de avaliações:</span>
                <span className="font-medium">{product.rating.count}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          fullWidth
          className="mt-8 bg-orange-500 hover:bg-orange-600 normal-case text-white py-3"
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}