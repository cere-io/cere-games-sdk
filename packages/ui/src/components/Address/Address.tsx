import styled from '@emotion/styled';

import { AddressIcon } from '../../icons';
import { Stack } from '../Stack';
import { Truncate } from '../Truncate';
import { Typography } from '../Typography';

export type AddressProps = {
  address: string;
};

const Wrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 100,
}));

export const Address = ({ address }: AddressProps) => (
  <Wrapper direction="row" spacing={1}>
    <AddressIcon fontSize={20} />
    <Typography variant="caption" fontWight="medium">
      <Truncate variant="hex" maxLength={10} text={address} />
    </Typography>
  </Wrapper>
);
