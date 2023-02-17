import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export type SpinnerProps = {
  gap?: number;
  thickness?: number;
  size?: number | string;
};

const rotate = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },

  to: {
    transform: 'rotate(360deg)',
  },
});

const Root = styled.svg({
  display: 'inline-block',
  animationName: rotate,
  animationDuration: '750ms',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
  transitionProperty: 'transform',
});

export const Spinner = ({ gap = 3, thickness = 3, size = '1em', ...props }: SpinnerProps) => (
  <Root height={size} width={size} {...props} viewBox="0 0 32 32">
    <circle
      role="presentation"
      cx={16}
      cy={16}
      r={14 - thickness / 2}
      stroke="currentColor"
      fill="none"
      strokeWidth={thickness}
      strokeDasharray={Math.PI * 2 * (11 - gap)}
      strokeLinecap="round"
    />
  </Root>
);
