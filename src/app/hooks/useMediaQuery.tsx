import { useState, useEffect } from 'react';

import { TypeViewPortsEnum } from '../enums/viewports.enum';
import { isMobile, isTablet } from '../utils/viewports';

const useMediaQuery = () => {
  const [viewport, setViewport] = useState<TypeViewPortsEnum>();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (isTablet(screenWidth)) {
        setViewport('TABLET');
      } else if (isMobile(screenWidth)) {
        setViewport('MOBILE');
      } else {
        setViewport('DESKTOP');
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [viewport])

  return viewport;
}

export default useMediaQuery;
