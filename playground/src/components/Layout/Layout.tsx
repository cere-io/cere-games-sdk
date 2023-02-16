import { PropsWithChildren } from 'react';
import { Container, Typography, Stack } from '@mui/material';

import { LayoutSection } from './LayoutSection';

export type LayoutProps = PropsWithChildren<{}>;

export const Layout = ({ children }: LayoutProps) => (
  <Container maxWidth="sm">
    <Typography align="center" variant="h5" marginTop={2} marginBottom={5}>
      Cere Games SDK Playground
    </Typography>

    <Stack direction="column" alignItems="center" spacing={3} marginY={2}>
      {children}
    </Stack>
  </Container>
);

Layout.Section = LayoutSection;
