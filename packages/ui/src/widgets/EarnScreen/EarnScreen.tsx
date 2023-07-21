import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { useAsyncCallback, useConfigContext, useMediaQuery, useWalletContext } from "../../hooks";
import { Button, Stack, Typography } from "../../components";
import { RepeatIcon } from "../../icons";

export type EarnScreenProps = {
  onConnect?: () => Promise<void> | void;
  score?: number;
  onShowLeaderboard?: () => void;
  onShowSignUp?: () => void;
};

const Connect = styled(Button)({
  marginBottom: "20px!important",
  fontSize: 16,
  fontWeight: "24px",
  borderRadius: 4,
  background: "rgba(243, 39, 88, 1)"
});

const ViewLeaderBoard = styled(Button)({
  background: "transparent",
  border: "1px solid rgba(255, 255, 255, 1)",
  borderRadius: 4,
  fontSize: 16,
  fontWeight: 600,
  fontFamily: "Lexend, sans-serif"
});

const Widget = styled(Stack)({
  position: "relative",
  maxWidth: 600,
  minWidth: 440,
  "@media (max-width: 600px)": {
    maxWidth: 345,
    minWidth: 345
  }
});

const HeaderTitle = styled(Typography)({
  fontFamily: "Yapari-SemiBold, sans-serif",
  color: "#FFF",
  fontSize: 24,
  fontStyle: "normal",
  fontWeight: 600
});

const PlayAgainText = styled(Typography)({
  marginLeft: 12
});

const HeaderSubTitle = styled(HeaderTitle)({
  fontStyle: "normal",
  fontSize: "46px",
  lineHeight: "55px",
  textTransform: "uppercase"
});

export const EarnScreen = ({ onConnect, score, onShowLeaderboard, onShowSignUp }: EarnScreenProps) => {
  const isLandscape = useMediaQuery("(max-height: 440px)");
  const [showConfetti, setShow] = useState(true);
  const { isReady, connecting } = useWalletContext();
  const { newWalletReward, sessionPrice, staticAssets } = useConfigContext();
  const [handleConnect, busy] = useAsyncCallback(onConnect);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (showConfetti) {
      timeoutId = setTimeout(() => setShow(false), 1500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showConfetti]);

  const isBusy = !isReady || connecting || busy;

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="stretch">
      <Stack style={{ zIndex: 2 }}>
        <HeaderTitle role="heading" aria-level={1} align="center" uppercase>
          You’ve earned
        </HeaderTitle>
        <HeaderSubTitle role="heading" aria-level={2}>
          {newWalletReward} $Cere
        </HeaderSubTitle>
      </Stack>
      <Stack spacing={2}>
        <Connect loading={isBusy} onClick={onShowSignUp}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <RepeatIcon />
            <PlayAgainText uppercase={false}>{sessionPrice} $CERE To Play Again</PlayAgainText>
          </div>
        </Connect>
        <ViewLeaderBoard loading={isBusy} onClick={onShowLeaderboard}>
          View Leaderboard
        </ViewLeaderBoard>
      </Stack>
    </Widget>
  );
};
