import React from 'react';
import { Typography } from '@material-ui/core';
import Moment from 'react-moment';

export default function AlertaHeader({ origem, criadoem }) {
  return (
    <div>
      <Typography variant="h3">
        Erro no {origem} em{' '}
        <Moment unix format="DD/MM/YYYY HH:mm">
          {criadoem.seconds}
        </Moment>{' '}
      </Typography>
    </div>
  );
}
