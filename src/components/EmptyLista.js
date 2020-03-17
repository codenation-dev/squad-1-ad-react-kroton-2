import React from 'react';
import Info from '@material-ui/icons/Info';
import { Box, Typography } from '@material-ui/core';

export default function Empty() {
  return (
    <Box
      mt={15}
      mb={20}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Info color="primary" fontSize="large" style={{ fontSize: 70 }} />
      <Typography>Não conseguimos encontrar nenhum alerta</Typography>
    </Box>
  );
}
