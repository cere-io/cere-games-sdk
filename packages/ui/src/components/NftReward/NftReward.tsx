import styled from '@emotion/styled';
import { useMemo } from 'react';

import { Typography } from '../Typography';
import { Stack } from '../Stack';
import { TableProps } from '../Table';
import { useMediaQuery } from '../../hooks';

export type NftRewardProps = Pick<TableProps, 'data'> & { address?: string };

const Wrapper = styled(Stack)(() => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  padding: '24px',
  flexDirection: 'row',

  '@media (max-width: 600px)': {
    flexDirection: 'column-reverse',
  },
}));

const NftWrapper = styled(Stack)(() => ({
  maxWidth: '200px',
  padding: '8px 10px 20px',
  background: 'linear-gradient(180deg, rgba(255, 210, 200, 0.2) 0%, rgba(175, 193, 255, 0.2) 100%)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(5px)',
  borderRadius: '12px',
  '@media (max-width: 600px)': {
    marginBottom: '24px',
  },
}));

const Image = styled('img')(() => ({
  width: '100%',
  borderRadius: ' 12px',
}));

const AccentText = styled(Typography)(() => ({
  display: 'inline-block',
  fontSize: '14px',
  lineHeight: '20px',
  color: 'rgba(244, 187, 127, 1)',
  fontWeight: 600,
}));

const StyledText = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#CBCBCB',
}));

const RewardInformation = styled('div')(() => ({
  display: 'flex',
  marginTop: '12px',
}));

const RewardInfoBlock = styled('div')(() => ({
  textAlign: 'center',
  width: '84px',
}));

const RewardInfoText = styled('div')(() => ({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '16px',
  color: '#FFFFFF',
  opacity: 0.5,
}));
const RewardInfoTextBold = styled(RewardInfoText)(() => ({
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  opacity: 0,
}));

export const NftReward = ({ data, address }: NftRewardProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const current = useMemo(() => data.find((row) => row.address === address), [data, address]);

  return (
    <Wrapper direction={isLandscape ? 'row' : 'column-reverse'} colGap={24}>
      <div>
        <Typography variant="h1" align={isMobile ? 'center' : 'left'} style={{ marginBottom: '8px' }}>
          Your NFT reward
        </Typography>
        <StyledText variant="body2" align={isMobile ? 'center' : 'left'}>
          Here is your achievement in form of classic NFT based on the game play result. Just{' '}
          <AccentText as="span">bring it to the Game Store</AccentText> and{' '}
          <AccentText as="span">apply it to the game</AccentText> and get up to 100 gem bonuses or even{' '}
          <AccentText as="span">sell your achievement</AccentText> in market. <br />
          <br />
          Or just play again to achieve even better game score and position.
        </StyledText>
      </div>
      <NftWrapper>
        <Image src="https://assets.cms.freeport.dev.cere.network/NFT_image_2_4848014041.jpg" alt="Nft Reward" />
        <RewardInformation>
          <RewardInfoBlock>
            <RewardInfoTextBold>{current?.rank}</RewardInfoTextBold>
            <RewardInfoText>Rank</RewardInfoText>
          </RewardInfoBlock>
          <div>
            <RewardInfoTextBold>{current?.score}</RewardInfoTextBold>
            <RewardInfoText>Game score</RewardInfoText>
          </div>
        </RewardInformation>
      </NftWrapper>
    </Wrapper>
  );
};
