import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { Stack } from '../Stack';

export type TableRowProps = {
  columns: ReactNode[];
};

const Column = styled.div({
  display: 'flex',
});

const Row = styled(Stack)(({ theme }) => ({
  height: 44,
  padding: theme.spacing(0, 2),
}));

export const TableRow = ({ columns }: TableRowProps) => (
  <Row direction="row" align="center">
    <Column style={{ width: 90 }}>{columns[0]}</Column>
    <Column style={{ flex: 1 }}>{columns[1]}</Column>
    <Column style={{ justifyContent: 'end' }}>{columns[2]}</Column>
    <Column style={{ width: 90, justifyContent: 'end' }}>{columns[3]}</Column>
  </Row>
);
