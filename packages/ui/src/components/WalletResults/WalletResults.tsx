import { LeaderBoard } from '@cere/games-sdk/src/api';
import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '../Button';
import { TableHeader } from '../Table/TableHeader';
import { TableRow } from '../Table/TableRow';
import { Typography } from '../Typography';
import { ArrowTopIcon } from '../../icons';

const Container = styled.div({
  maxHeight: '412px',
  overflowY: 'auto',
});

const ScrollToTop = styled(Button)({
  position: 'sticky',
  display: 'grid',
  gridTemplateColumns: '16px auto',
  gridColumnGap: '5px',
  alignItems: 'center',
  bottom: '18px',
  left: 0,
  right: 0,
  margin: 'auto',
  width: '88px !important',
  minHeight: '32px !important',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '10px 32px',
  fontWeight: 700,
  fontSize: '14px !important',
  lineHeight: '12px',
  color: '#000000',
  '& > div': {
    padding: 0,
  },
});

const Wrapper = styled.div(({ theme }) => ({
  backgroundColor: 'rgba(233, 204, 255, 0.05)',
  borderRadius: theme.borderRadius(2),
  marginBottom: 1,
}));

export const WalletResults = ({ results, rank }: { results?: LeaderBoard; rank?: number }) => {
  const [showScrollToTop, setShow] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const toggleVisible = useCallback(() => {
    if (!containerRef.current) {
      return;
    }
    if (containerRef.current.scrollTop > 150) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  useEffect(() => {
    const ref = containerRef.current;
    ref?.addEventListener('scroll', toggleVisible, false);
    return () => {
      ref?.removeEventListener('scroll', toggleVisible, false);
    };
  }, [toggleVisible]);

  const handleClick = () => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container ref={containerRef} role="table">
      <TableHeader columns={['Score', 'Rank', 'Date']} />
      {(!results || results.length === 0) && <div>There are no results yet</div>}
      {results &&
        results.length > 0 &&
        results?.map((result) => (
          <Wrapper key={result.id} role="row">
            <TableRow
              active={Boolean(rank)}
              columns={[
                <Typography>{result.score}</Typography>,
                <Typography>{rank}</Typography>,
                <Typography>{new Date(result.updatedAt as string).toDateString()}</Typography>,
              ]}
            />
          </Wrapper>
        ))}
      {showScrollToTop && (
        <ScrollToTop icon={<ArrowTopIcon />} onClick={handleClick}>
          Top
        </ScrollToTop>
      )}
    </Container>
  );
};
