'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
