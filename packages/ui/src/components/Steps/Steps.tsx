import styled from '@emotion/styled';

import { useMediaQuery } from '../../hooks';
import { Stack, Typography } from '../../components';
import { ArrowRightIcon } from '../../icons';

const Container = styled(Stack)({
  width: 460,
  height: 100,
  '@media (max-width: 600px)': {
    maxWidth: 312,
  },
});

const StepContainer = styled(Stack)({
  letterSpacing: '0em',
  maxHeight: 94,
  width: '100%',
});

const NumberWrapper = styled(Stack)({
  width: 134,
  maxHeight: 94,
  '@media (max-width: 600px)': {
    width: 104,
    maxHeight: 79,
  },
});

const Number = styled(Typography)({
  fontFamily: 'Yapari-SemiBold',
  fontSize: 48,
  fontStyle: 'normal',
  lineHeight: 'normal',
  '@media (max-width: 600px)': {
    fontSize: 36,
  },
});

interface StepsProps {
  number: string;
  text: string;
}

const mockData: StepsProps[] = [
  {
    number: '01',
    text: 'Play Metaverse Dash Run',
  },
  {
    number: '02',
    text: 'Create a Cere wallet',
  },
  {
    number: '03',
    text: 'Claim your $CERE tokens',
  },
];

export const Steps = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Container direction="row" margin={[0, 0, 4, 0]} align="start">
      {mockData.map(({ number, text }, index) => (
        <StepContainer direction="row">
          <NumberWrapper>
            <Number variant="body1" uppercase align="center" fontWight="semi-bold">
              {number}
              <Typography align="center" fontWight="regular" style={{ fontSize: isMobile ? '11px' : '15px' }}>
                {text}
              </Typography>
            </Number>
          </NumberWrapper>
          {!isMobile && index !== mockData.length - 1 ? <ArrowRightIcon /> : null}
        </StepContainer>
      ))}
    </Container>
  );
};
