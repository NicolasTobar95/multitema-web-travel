import React from 'react';
import PandaLogo from '../../../components/PandaLogo';

interface BrandLogoProps {
  showText?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ showText = true }) => {
  return (
    <PandaLogo
      className="w-6 h-6"
      text={showText ? 'Waypoint' : undefined}
      textClassName="text-xs font-bold uppercase tracking-[0.25em]"
    />
  );
};

export default BrandLogo;
