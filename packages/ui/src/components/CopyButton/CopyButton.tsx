import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CopiedIcon, CopyIcon } from '../../icons';
import { Button } from '../Button';
import { useWalletContext } from '../../hooks';

const Container = styled.div({
  position: 'relative',
  height: 'auto',
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
});

const ButtonContainer = styled(Button)({
  width: 14,
  minHeight: 14,
  background: 'transparent',
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    padding: '12px 16px',
  },
});

const TooltipContainer = styled.div({
  width: 'auto',
  height: 'auto',
  background: 'transparent',
  position: 'absolute',
  top: '-40px',
  right: '-20px',
});

export const CopyButton = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { address } = useWalletContext();

  const copyButton = async () => {
    try {
      if (address) {
        await navigator.clipboard.writeText(address);
        setShowTooltip(true);
      }
    } catch (err) {
      console.log('error');
    }
  };

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (showTooltip) {
      timeOut = setTimeout(() => {
        setShowTooltip(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [showTooltip]);

  return (
    <Container>
      {showTooltip && (
        <TooltipContainer>
          <CopiedIcon />
        </TooltipContainer>
      )}
      <ButtonContainer onClick={copyButton}>
        <CopyIcon />
      </ButtonContainer>
    </Container>
  );
};
