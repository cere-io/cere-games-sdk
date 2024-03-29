import { ReactNode, AriaRole } from 'react';
import styled from '@emotion/styled';

import { useMediaQuery } from '../../hooks';
import { Stack } from '../Stack';

export type TableRowProps = {
  header?: boolean;
  columns: ReactNode[];
  active?: boolean;
};

const Column = styled.div({
  display: 'flex',
});

const Row = styled(Stack)<{ active?: boolean }>(({ theme, active }) => ({
  height: 44,
  padding: theme.spacing(0, 2),
  filter: active ? 'none' : 'blur(5px)',
}));

export const TableRow = ({ columns, header = false, active }: TableRowProps) => {
  const isMobile = useMediaQuery('(max-width: 440px)');
  const columnRole: AriaRole = header ? 'columnheader' : 'cell';

  return (
    <Row role="row" active={active} direction="row" align="center">
      <Column role={columnRole} style={{ width: 90 }}>
        {columns[0]}
      </Column>
      <Column role={columnRole} style={{ flex: isMobile ? '55%' : 1 }}>
        {columns[1]}
      </Column>
      <Column role={columnRole} style={{ justifyContent: 'end' }}>
        {columns[2]}
      </Column>
      <Column role={columnRole} style={{ width: 90, justifyContent: 'end' }}>
        {columns[3]}
      </Column>
    </Row>
  );
};
