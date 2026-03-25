'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="aspect-square bg-gray-100 rounded-lg">
        <Skeleton variant="rectangular" height="100%" className="rounded-lg" />
      </div>

      <div>
        <Skeleton variant="text" height={48} width="80%" className="mb-4" />
        
        <div className="flex items-center gap-2 mb-4">
          <Skeleton variant="text" width={120} height={24} />
          <Skeleton variant="text" width={80} height={24} />
        </div>

        <Skeleton variant="text" width="30%" height={24} className="mb-2" />
        <Skeleton variant="text" width="40%" height={48} className="mb-6" />
        
        <Skeleton variant="text" height={80} className="mb-8" />
        
        <Card className="bg-gray-50">
          <CardContent>
            <Skeleton variant="text" width="50%" height={32} className="mb-4" />
            <div className="space-y-3">
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="100%" height={20} />
            </div>
          </CardContent>
        </Card>

        <Skeleton variant="rectangular" height={48} className="mt-8 rounded-lg" />
      </div>
    </div>
  );
}