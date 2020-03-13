import React from 'react';
import { Typography } from '@material-ui/core';

export default function AlertaBody({ title, details }) {
  return (
    <section>
      <div>
        <Typography variant="h5">Título</Typography>
        <p>{title}</p>
      </div>
      <div>
        <Typography variant="h5">Detalhes</Typography>
        <p>{details}</p>
      </div>
    </section>
  );
}
