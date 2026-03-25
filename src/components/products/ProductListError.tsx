'use client';

import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

interface ProductListErrorProps {
  error: Error;
  onRetry?: () => void;
}

export function ProductListError({ error, onRetry }: ProductListErrorProps) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <Typography variant="h6" className="text-red-500">
          Erro ao carregar produtos
        </Typography>
        <Typography variant="body2" className="text-gray-500 mt-2">
          {error.message}
        </Typography>
        {onRetry && (
          <Button
            variant="contained"
            onClick={onRetry}
            className="mt-4 bg-orange-500 hover:bg-orange-600"
          >
            Tentar novamente
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
