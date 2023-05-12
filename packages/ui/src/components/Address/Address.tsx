import { AriaAttributes } from 'react';
import styled from '@emotion/styled';

import { AddressIcon } from '../../icons';
import { Stack } from '../Stack';
import { Truncate } from '../Truncate';
import { Typography } from '../Typography';

export type AddressProps = AriaAttributes & {
  address: string;
};

const Wrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 100,
}));

export const Address = ({ address, ...props }: AddressProps) => (
  <Wrapper {...props} direction="row" spacing={1} title={address}>
    <AddressIcon fontSize={20} />
    <Typography variant="caption" fontWight="medium">
      <Truncate variant="hex" maxLength={10} text={address} />
    </Typography>
  </Wrapper>
);
