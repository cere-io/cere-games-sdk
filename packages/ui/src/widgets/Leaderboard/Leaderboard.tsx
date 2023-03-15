import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { Alert, Address, Button, Stack, Table, TableProps, Typography } from '../../components';
import { RepeatIcon, CereGamingIcon } from '../../icons';
import { useWalletContext } from '../../hooks';

export type LeaderboardProps = Pick<TableProps, 'data'> & {
  sessionPrice?: number;
  onPlayAgain?: () => Promise<void> | void;
};

const Widget = styled.div({
  maxWidth: 600,

  '@media (max-width: 600px)': {
    position: 'relative',
    width: 'auto',
  },
});

const Tournament = styled.div({
  width: '100%',
  background:
    'url(https://assets.cms.freeport.dev.cere.network/background_claim_prizes_full_b7ff007b86.png), linear-gradient(84.77deg, #8B00EC 2.91%, rgba(139, 0, 236, 0.2) 94.57%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center right',
  backgroundRepeat: 'no-repeat',
  borderRadius: '12px',
  padding: 16,
});

const Row = styled.div({
  display: 'grid',
  gridTemplateColumns: '190px auto',
  gridColumnGap: '15%',
  '@media (max-width: 600px)': {
    gridColumnGap: '10%',
  },
});

const TimeLeftText = styled(Typography)({
  fontSize: 10,
  lineHeight: '12.5px',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.8)',
  '& > span': {
    fontWeight: 900,
    color: '#ffffff',
  },
});

const StyledImage = styled.img({
  width: 120,
  height: 120,
});

const Container = styled(Stack)({
  width: '100%',
});

const GamePortalButton = styled(Button)({
  background: 'linear-gradient(90deg, rgba(245, 187, 255, 0.3) 0%, rgba(245, 187, 255, 0) 93.55%)',
  borderRadius: 12,
  padding: '18.5px 16px',
  justifyContent: 'flex-start',
  textTransform: 'uppercase',
  '& > div': {
    fontFamily: 'Bebas Neue',
    fontSize: 24,
    lineHeight: '32px',
  },
});

const BalanceText = styled.p({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '16px',
  color: '#CBCBCB',
  marginTop: 0,
  '& > span': {
    fontWeight: 500,
  },
});

const StyledStack = styled(Stack)({
  width: '100%',
});

const StyledTypography = styled(Typography)({
  fontFamily: 'Bebas Neue',
});

export const Leaderboard = ({ data, sessionPrice = 0, onPlayAgain }: LeaderboardProps) => {
  const [busy, setBusy] = useState(false);
  const { address, balance = 0 } = useWalletContext();

  const handlePlayAgain = useCallback(async () => {
    setBusy(true);
    await onPlayAgain?.();
    setBusy(false);
  }, [onPlayAgain]);

  return (
    <Widget>
      <Stack spacing={4}>
        <StyledStack spacing={3}>
          <Container spacing={2}>
            <Alert />
            <Tournament>
              <Row>
                <div>
                  <Stack spacing={2} align="start">
                    <Stack spacing={1} align="start">
                      <Typography variant="caption" uppercase fontWight="semi-bold">
                        Weekly tournament
                      </Typography>
                      <TimeLeftText fontWight="bold">
                        Time left: <span>1 day</span>
                      </TimeLeftText>
                    </Stack>
                    <StyledTypography variant="h1" uppercase>
                      TOP 20 players <br />
                      win UNIQUE NFT
                    </StyledTypography>
                  </Stack>
                </div>
                <StyledImage src="https://assets.cms.freeport.dev.cere.network/box_22e9d83042.png" alt="" />
              </Row>
            </Tournament>
            <GamePortalButton icon={<CereGamingIcon />}>cere game PORTAL</GamePortalButton>
          </Container>
          <Container direction="column" spacing={1}>
            <BalanceText>
              Your balance: <b>{balance} $CERE</b>
            </BalanceText>
            <Button disabled={balance < sessionPrice} loading={busy} icon={<RepeatIcon />} onClick={handlePlayAgain}>
              <Typography variant="inherit" noWrap>
                Play again{' '}
                {sessionPrice && (
                  <Typography inline variant="inherit" fontWight="bold">
                    {sessionPrice} $CERE
                  </Typography>
                )}
              </Typography>
            </Button>
          </Container>
        </StyledStack>
        <StyledStack direction="row" spacing="space-between">
          <Typography variant="h1">Leaderboard</Typography>
          {address && <Address address={address} />}
        </StyledStack>
      </Stack>

      <Table data={data} activeAddress={address} />
    </Widget>
  );
};
