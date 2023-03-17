import styled from '@emotion/styled';
import { useMemo, useRef } from 'react';

import { TableDataRow, TableDataRowProps } from './TableDataRow';
import { TableHeader } from './TableHeader';
import { Button } from '../Button';
import { ArrowTopIcon } from '../../icons';
import { useIsInViewport } from '../../hooks';

export type TableProps = {
  activeAddress?: string;
  data: TableDataRowProps['data'][];
};

const Container = styled.div({
  maxHeight: '600px',
  overflowY: 'auto',
});

const ScrollToTop = styled(Button)({
  position: 'fixed',
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
  const activeRow = useMemo(() => data.find((row) => row.address === activeAddress), [data, activeAddress]);
  const rows = useMemo(() => data.filter((row) => row !== activeRow), [activeRow, data]);

  const firsElRef = useRef<HTMLDivElement>(null);

  const showMoreInViewport = useIsInViewport(firsElRef);

  const handleClick = () => {
    if (!firsElRef.current) {
      return;
    }
    firsElRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  return (
    <Container>
      <TableHeader columns={['Rank', 'Player', 'Prize', 'Score']} />
      {activeRow && (
        <div ref={firsElRef} style={{ scrollMarginTop: '600px' }}>
          <TableDataRow hasReward={true} active data={activeRow} />
        </div>
      )}
      {rows.map((row, idx) => (
        <TableDataRow key={row.address} data={row} hasReward={idx <= 19} />
      ))}
      {!showMoreInViewport && (
        <ScrollToTop icon={<ArrowTopIcon />} onClick={handleClick}>
          Top
        </ScrollToTop>
      )}
    </Container>
  );
};
