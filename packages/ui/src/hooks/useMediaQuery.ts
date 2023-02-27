import { useState, useLayoutEffect, useMemo } from 'react';

export const useMediaQuery = (query: string) => {
  const media = useMemo(() => window.matchMedia(query), [query]);
  const [matches, setMatches] = useState(media.matches);

  useLayoutEffect(() => {
    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [media, query]);

  return matches;
};
