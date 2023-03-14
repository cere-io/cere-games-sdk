import styled from '@emotion/styled';
import { useMemo } from 'react';

import { TableDataRow, TableDataRowProps } from './TableDataRow';
import { TableHeader } from './TableHeader';

export type TableProps = {
  activeAddress?: string;
  data: TableDataRowProps['data'][];
};

const Container = styled.div({});

export const Table = ({ data, activeAddress }: TableProps) => {
  const activeRow = useMemo(() => data.find((row) => row.address === activeAddress), [data, activeAddress]);
  const rows = useMemo(() => data.filter((row) => row !== activeRow), [activeRow, data]);

  console.log(rows);

  return (
    <Container>
      <TableHeader columns={['Rank', 'Player', 'Prize', 'Score']} />
      {activeRow && <TableDataRow active data={activeRow} />}
      {rows.map((row, idx) => (
        <TableDataRow key={row.address} showPrize={idx <= 20} data={row} />
      ))}
    </Container>
  );
};
