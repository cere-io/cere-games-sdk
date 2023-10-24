import styled from '@emotion/styled';

import { useGameInfo, useMediaQuery } from '../../hooks';
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

export const Steps = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const {
    name,
    preloader: { description },
  } = useGameInfo();

  const mockData: string[] = [
    `Play ${name}` || 'Play Metaverse Dash Run',
    'Create your account',
    'Be top-3 and get a prize',
  ];

  return (
    <Container direction="row" margin={[0, 0, 4, 0]} align="start">
      {description?.map((text, index) => (
        <StepContainer direction="row">
          <NumberWrapper>
            <Number variant="body1" align="center" fontWight="semi-bold">
              {`0${index + 1}`}
              <Typography align="center" fontWight="regular" style={{ fontSize: isMobile ? '13px' : '16px' }}>
                {text || mockData[index]}
              </Typography>
            </Number>
          </NumberWrapper>
          {!isMobile && index !== mockData.length - 1 ? <ArrowRightIcon /> : null}
        </StepContainer>
      ))}
    </Container>
  );
};
