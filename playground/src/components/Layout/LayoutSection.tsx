import { PropsWithChildren } from 'react';
import { Typography, Stack, Divider } from '@mui/material';

export type LayoutSectionProps = PropsWithChildren<{
  title?: string;
}>;

export const LayoutSection = ({ title, children }: LayoutSectionProps) => (
  <Stack spacing={3} alignSelf="stretch">
    <Divider flexItem>
      <Typography variant="caption">{title}</Typography>
    </Divider>

    <Stack spacing={2}>{children}</Stack>
  </Stack>
);
