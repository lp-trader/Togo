import React from 'react';
import logoImg from '../assets/logo.png';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Enhanced, larger sizing for improved brand presence as requested
  const sizeClasses =
    size === 'sm'
      ? 'w-12 h-12'
      : size === 'md'
      ? 'w-[74px] h-[74px] sm:w-[88px] sm:h-[88px]'
      : size === 'lg'
      ? 'w-24 h-24 sm:w-28 sm:h-28'
      : 'w-32 h-32 sm:w-40 sm:h-40';

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="Pastas to go"
        className={`${sizeClasses} object-contain transition-transform hover:scale-105 duration-200`}
        loading="eager"
      />
    </div>
  );
};
