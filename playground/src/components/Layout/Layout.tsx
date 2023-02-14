import { PropsWithChildren } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';

export type LayoutProps = PropsWithChildren<{}>;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} marginY={2}>
        <Typography align="center" variant="h5">
          Cere Games SDK Playground
        </Typography>
        <Box display="flex" justifyContent="center">
          {children}
        </Box>
      </Stack>
    </Container>
  );
};
