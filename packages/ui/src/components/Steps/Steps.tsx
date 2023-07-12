import styled from '@emotion/styled';

import { Stack, Typography } from '../../components';
import { ArrowRightIcon } from "../../icons";

const Container = styled(Stack)({
  width: 460,
  height: 100,
});

const StepContainer = styled(Stack)({
  letterSpacing: '0em',
  maxHeight: 94,
  width: '100%',
});

const NumberWrapper = styled(Stack)({
  width: 134,
  maxHeight: 94,
});

const Number = styled(Typography)({
  // fontFamily: Yapari, // TODO fix when add a font
  fontSize: 48,
  fontStyle: 'normal',
  lineHeight: 'normal',
});

interface StepsProps {
  number: string;
  text: string;
}

const mockData: StepsProps[] = [
  {
    number: '01',
    text: 'Play Metaverse Dash Run'
  },
  {
    number: '02',
    text: 'Create a Cere wallet'
  },
  {
    number: '03',
    text: 'Claim your $CERE tokens'
  },
]

export const Steps = (): JSX.Element => {

  return (
    <Container direction="row" margin={[0, 0, 4, 0]} align="start">
      {mockData.map(({ number, text }, index) => (
        <StepContainer direction="row">
          <NumberWrapper>
            <Number variant="body1" uppercase align="center" fontWight="semi-bold">
              {number}
              <Typography
                align="center"
                fontWight="regular"
                style={{ fontSize: '15px' }}
              >
                {text}
              </Typography>
            </Number>
          </NumberWrapper>
          {index !== mockData.length -1 ? <ArrowRightIcon /> : null}
        </StepContainer >
      ))}
    </Container>
  )
}
