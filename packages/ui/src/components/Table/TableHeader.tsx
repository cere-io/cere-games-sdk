import { Typography } from '../Typography';
import { TableRow, TableRowProps } from './TableRow';

export type TableHeaderProps = TableRowProps;

export const TableHeader = ({ columns }: TableHeaderProps) => (
  <TableRow
    header
    activeAddress
    columns={columns.map((column, index) => (
      <Typography color="secondary" variant="caption">
        {column}
      </Typography>
    ))}
  />
);
