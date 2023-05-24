import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TableDataRow, TableDataRowProps } from './TableDataRow';
import { TableHeader } from './TableHeader';
import { Button } from '../Button';
import { ArrowTopIcon } from '../../icons';

const MAX_RANK_WITH_GIFT = 20;
const MAX_RANK_WITH_GIFT_WITH_TOURNAMENT = 3;

export type TableProps = {
  activeAddress?: string;
  data: TableDataRowProps['data'][];
  hasTournament: boolean;
};

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

export const Table = ({ data, activeAddress, hasTournament }: TableProps) => {
  const [showScrollToTop, setShow] = useState(false);
  const activeRow = useMemo(() => data.find((row) => row.address === activeAddress), [data, activeAddress]);
  const rows = useMemo(() => data.filter((row) => row !== activeRow), [activeRow, data]);

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
      <TableHeader columns={['Rank', 'Player', 'Prize', 'Score']} />
      {activeRow && (
        <TableDataRow
          hasReward={activeRow.rank <= (hasTournament ? MAX_RANK_WITH_GIFT_WITH_TOURNAMENT : MAX_RANK_WITH_GIFT)}
          active
          data={activeRow}
        />
      )}
      {rows.map((row) => (
        <TableDataRow
          key={row.address}
          data={row}
          hasReward={row.rank <= (hasTournament ? MAX_RANK_WITH_GIFT_WITH_TOURNAMENT : MAX_RANK_WITH_GIFT)}
        />
      ))}
      {showScrollToTop && (
        <ScrollToTop icon={<ArrowTopIcon />} onClick={handleClick}>
          Top
        </ScrollToTop>
      )}
    </Container>
  );
};
