import { SVGProps } from 'react';

import trophy from '../assets/trophy.png';

export const TrophyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="20 20 160 160" {...props}>
    <image href={trophy} height="200" width="200" />
  </svg>
);
