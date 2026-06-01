import React from 'react';
import { cn } from '@/lib/cn';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton', className)} aria-hidden />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-3', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonToolCard() {
  return (
    <div className="tool-card rounded-xl p-7 md:p-8">
      <Skeleton className="mb-6 h-14 w-14 rounded-xl" />
      <Skeleton className="mb-3 h-6 w-2/3" />
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonPlanCard() {
  return (
    <div className="card-plan flex flex-col rounded-2xl p-8 pt-10 md:p-10 md:pt-12">
      <Skeleton className="mb-6 h-11 w-11 rounded-xl" />
      <Skeleton className="mb-2 h-7 w-1/3" />
      <Skeleton className="mb-6 h-4 w-4/5" />
      <Skeleton className="mb-8 h-12 w-full rounded-xl" />
      <SkeletonText lines={6} />
    </div>
  );
}

export function SkeletonToolGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonToolCard key={i} />
      ))}
    </div>
  );
}
