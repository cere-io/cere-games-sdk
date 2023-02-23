import { Typography } from '../Typography';
import { TableRow, TableRowProps } from './TableRow';

export type TableHeaderProps = TableRowProps;

export const TableHeader = ({ columns }: TableHeaderProps) => (
  <TableRow
    columns={columns.map((column) => (
      <Typography uppercase color="secondary" variant="caption">
        {column}
      </Typography>
    ))}
  />
);
