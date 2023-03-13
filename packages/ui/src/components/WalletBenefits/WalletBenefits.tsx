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
});

const StyledImage = styled.img({
  background: 'url(https://assets.cms.freeport.dev.cere.network/back_light_c5c86cb236.png) no-repeat',
  backgroundSize: '60px 95px',
  maxHeight: 65,
});

const benefits: { title: string; url: string }[] = [
  {
    title: 'Save your score',
    url: 'https://assets.cms.freeport.dev.cere.network/stars_66a5bd656a.png',
  },
  {
    title: 'See how you stack up against others',
    url: 'https://assets.cms.freeport.dev.cere.network/medal_634300bf84.png',
  },
  {
    title: 'Win cool prizes',
    url: 'https://assets.cms.freeport.dev.cere.network/prize_8e66a0bd01.png',
  },
];

export const WalletBenefits = () => (
  <Stack spacing={1}>
    {benefits.map(({ title, url }) => {
      return (
        <Item key={title}>
          <StyledImage src={url} alt={title} />
          <span>{title}</span>
        </Item>
      );
    })}
  </Stack>
);
