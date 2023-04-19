import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TableDataRow, TableDataRowProps } from './TableDataRow';
import { TableHeader } from './TableHeader';
import { Button } from '../Button';
import { ArrowTopIcon } from '../../icons';

export type TableProps = {
  activeAddress?: string;
  data: TableDataRowProps['data'][];
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

export const Table = ({ data, activeAddress }: TableProps) => {
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
    <Container ref={containerRef}>
      <TableHeader columns={['Rank', 'Player', 'Prize', 'Score']} />
      {activeRow && <TableDataRow hasReward={true} active data={activeRow} />}
      {rows.map((row, idx) => (
        <TableDataRow key={row.address} data={row} hasReward={idx <= 19} />
      ))}
      {showScrollToTop && (
        <ScrollToTop icon={<ArrowTopIcon />} onClick={handleClick}>
          Top
        </ScrollToTop>
      )}
    </Container>
  );
};
