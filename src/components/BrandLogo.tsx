import React from 'react';
import PandaLogo from './PandaLogo';

interface BrandLogoProps {
  brand: string;
  showText?: boolean;
  className?: string;
  textClassName?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  brand,
  showText = true,
  className = 'w-8 h-8',
  textClassName = 'text-xl font-bold tracking-wide ml-2',
}) => {
  return (
    <PandaLogo
      className={className}
      text={showText ? brand : undefined}
      textClassName={textClassName}
    />
  );
};

export default BrandLogo;