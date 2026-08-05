import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export function Card({ children, glow, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass-panel rounded-3xl p-6 transition-all duration-300',
        glow && 'cyber-glow border-cyan-500/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
