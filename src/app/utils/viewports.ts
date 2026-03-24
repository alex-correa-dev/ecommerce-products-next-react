import { BREAKPOINTS } from '../constants/breakpoints';

const isMobile = (screenWidth: number) => {
  return screenWidth < BREAKPOINTS.MD;
}

const isTablet = (screenWidth: number) => {
  return screenWidth >= BREAKPOINTS.MD && screenWidth <= BREAKPOINTS.LG;
}

const isDesktop = (screenWidth: number) => {
  return screenWidth > BREAKPOINTS.LG;
}

export { isMobile, isTablet, isDesktop };