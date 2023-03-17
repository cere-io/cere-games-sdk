import styled from '@emotion/styled';

import { Stack } from '../Stack';

const Item = styled.div({
  width: 450,
  display: 'flex',
  alignItems: 'center',
  columnGap: '29px',
  maxHeight: '88px',
  padding: '15px 18px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',

  borderRadius: '12px',
  '&>span': {
    fontFamily: 'Bebas Neue, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
  },

  '@media (max-width: 600px)': {
    width: '100%',
  },
});

const IconBlock = styled.div({
  width: 64,
  height: 64,
  background: 'url(https://assets.cms.freeport.dev.cere.network/back_light_1c2a02de4b.png)',
  backgroundSize: '100% 135%',
});

const StyledImage = styled.img({
  maxHeight: 64,
});

const benefits: { title: string; url: string }[] = [
  {
    title: 'Save your score',
    url: 'https://assets.cms.freeport.dev.cere.network/gaming_flag_1_c4694198b3.png',
  },
  {
    title: 'See how you stack up against others',
    url: 'https://assets.cms.freeport.dev.cere.network/gaming_flag_2_e9e8b7d37c.png',
  },
  {
    title: 'Win cool prizes',
    url: 'https://assets.cms.freeport.dev.cere.network/star_trophy_3_f18a9faca7.png',
  },
];

export const WalletBenefits = () => (
  <Stack spacing={1}>
    {benefits.map(({ title, url }) => {
      return (
        <Item key={title}>
          <IconBlock>
            <StyledImage src={url} alt={title} />
          </IconBlock>
          <span>{title}</span>
        </Item>
      );
    })}
  </Stack>
);
