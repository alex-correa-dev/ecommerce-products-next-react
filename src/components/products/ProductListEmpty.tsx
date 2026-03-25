'use client';

import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';
import { Typography } from '../ui/Typography';

export function ProductListEmpty() {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <Typography variant="h6" className="text-gray-500">
          Nenhum produto encontrado
        </Typography>
        <Typography variant="body2" className="text-gray-400 mt-2">
          Tente novamente mais tarde
        </Typography>
      </CardContent>
    </Card>
  );
}
