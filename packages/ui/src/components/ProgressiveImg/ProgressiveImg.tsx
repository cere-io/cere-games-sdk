import { ImgHTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { Spinner } from '../Spinner';
import { Stack } from '../Stack';

export type ProgressiveImgProps = Partial<ImgHTMLAttributes<HTMLImageElement>> & {
  src?: string;
  isLoadingProp: boolean;
};

const StyledImage = styled.img({
  height: 200,
  width: '100%',
  objectFit: 'fill',
  borderRadius: 12,
  '@media (max-height: 440px)': {
    height: 130,
  },
});

const StyledStack = styled(Stack)({
  justifyContent: 'center',
  height: '100%',
});

export const ProgressiveImg = ({ src, isLoadingProp, ...props }: ProgressiveImgProps) => {
  return (
    <StyledStack align="center">
      {isLoadingProp ? <Spinner size="25" /> : <StyledImage src={src} alt={props.alt || ''} className="image" />}
    </StyledStack>
  );
};
