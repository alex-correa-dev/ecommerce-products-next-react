'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';
import { CardMedia } from '../ui/CardMedia';
import { CardActions } from '../ui/CardActions';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { ProductCardProps } from './types';

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`} className="block">
        <CardMedia
          component="div"
          className="relative pt-[100%] bg-gray-100"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardMedia>
      </Link>
      
      <CardContent className="flex-grow">
        <Link href={`/products/${product.id}`} className="hover:no-underline">
          <Typography
            variant="h6"
            component="h2"
            className="line-clamp-2 mb-2 font-semibold text-base hover:text-orange-500 transition-colors"
          >
            {product.title}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          className="text-gray-500 text-sm"
        >
          {product.category}
        </Typography>
        <Typography
          variant="h6"
          className="mt-3 font-bold text-orange-600"
        >
          R$ {product.price.toFixed(2)}
        </Typography>
      </CardContent>
      
      <CardActions className="p-4 pt-0">
        <Button
          component={Link}
          href={`/products/${product.id}`}
          variant="contained"
          fullWidth
          className="bg-orange-500 hover:bg-orange-600 normal-case text-white"
        >
          Ver mais
        </Button>
      </CardActions>
    </Card>
  );
}
