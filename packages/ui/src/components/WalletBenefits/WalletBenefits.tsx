import styled from '@emotion/styled';

import { Stack } from '../Stack';
import { useConfigContext } from '../../hooks';

const Item = styled.div({
  width: 311,
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

const IconBlock = styled.div({
  width: 64,
  height: 64,
});

const StyledImage = styled.img({
  maxHeight: 64,
});

export const WalletBenefits = () => {
  const { staticAssets } = useConfigContext();
  const benefits: { title: string; url: string }[] = [
    {
      title: 'Save your score',
      url: staticAssets.star,
    },
    {
      title: 'See how you stack up against others',
      url: staticAssets.place,
    },
    {
      title: 'Win cool prizes',
      url: staticAssets.chest,
    },
  ];
  return (
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
};
