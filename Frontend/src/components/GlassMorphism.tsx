
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

const GlassMorphism = ({ 
  children, 
  className, 
  hoverEffect = true, 
  intensity = 'medium' 
}: GlassMorphismProps) => {
  
  const getOpacity = () => {
    switch (intensity) {
      case 'light': return 'bg-white/20';
      case 'heavy': return 'bg-white/60';
      case 'medium':
      default: return 'bg-white/40';
    }
  };

  const getBorderOpacity = () => {
    switch (intensity) {
      case 'light': return 'border-white/20';
      case 'heavy': return 'border-white/60';
      case 'medium':
      default: return 'border-white/40';
    }
  };

  return (
    <div 
      className={cn(
        getOpacity(),
        getBorderOpacity(),
        'backdrop-blur-md border shadow-glass rounded-2xl transition-all duration-300 ease-in-out',
        hoverEffect && 'hover:shadow-glass-hover hover:border-white/60',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
