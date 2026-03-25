'use client';

import { Card } from '../ui/Card';
import { CardContent } from '../ui/CardContent';
import { Skeleton } from '../ui/Skeleton';

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="h-full">
          <Skeleton variant="rectangular" height={200} />
          <CardContent>
            <Skeleton variant="text" height={32} className="mb-2" />
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={32} className="mt-3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
