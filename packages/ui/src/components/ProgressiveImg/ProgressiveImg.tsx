import { ImgHTMLAttributes, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Stack } from '../Stack';

export type ProgressiveImgProps = Partial<ImgHTMLAttributes<HTMLImageElement>> & {
  src?: string;
};

const StyledImage = styled.img({
  maxHeight: 280,
  objectFit: 'cover',
  borderRadius: 12,
  '@media (max-height: 440px)': {
    height: 130,
  },
});

const StyledStack = styled(Stack)({
  justifyContent: 'center',
  height: '100%',
});

export const ProgressiveImg = ({ src, ...props }: ProgressiveImgProps) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (src) {
      setLoading(true);
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoading(false);
      };
    }
  }, [src]);

  return (
    <StyledStack align="center">
      <StyledImage src={src} alt={props.alt || ''} className="image" />
    </StyledStack>
  );
};
