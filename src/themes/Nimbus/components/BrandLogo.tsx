import React from 'react';
import PandaLogo from '../../../components/PandaLogo';

interface BrandLogoProps {
  showText?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ showText = true }) => {
  return (
    <PandaLogo
      className="w-8 h-8"
      text={showText ? 'Nimbus' : undefined}
      textClassName="text-xl font-bold tracking-wide ml-2"
    />
  );
};

export default BrandLogo;
