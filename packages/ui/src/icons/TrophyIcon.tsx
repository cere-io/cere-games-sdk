import { SVGProps } from 'react';

import { useConfigContext } from '../hooks';

export const TrophyIcon = (props: SVGProps<SVGSVGElement>) => {
  const { sdkUrl: cdnUrl } = useConfigContext();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="20 20 160 160" {...props}>
      <image href={`${cdnUrl}/assets/trophy.png`} height="200" width="200" />
    </svg>
  );
};
