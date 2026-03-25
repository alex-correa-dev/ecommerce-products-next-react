'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

interface ProductErrorProps {
  error: Error;
}

export function ProductError({ error }: ProductErrorProps) {
  const router = useRouter();

  return (
    <Card className="text-center py-12">
      <CardContent>
        <Typography variant="h6" className="text-red-500 mb-2">
          Erro ao carregar produto
        </Typography>
        <Typography variant="body2" className="text-gray-500 mb-4">
          {error.message}
        </Typography>
        <div className="flex gap-4 justify-center">
          <Button
            variant="contained"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 normal-case text-white"
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            onClick={() => router.refresh()}
            className="bg-orange-500 hover:bg-orange-600 normal-case text-white"
          >
            Tentar novamente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}