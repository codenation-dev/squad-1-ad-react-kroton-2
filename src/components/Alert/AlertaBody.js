import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  event: {
    marginTop: 20
  }
}));

export default function AlertaBody({ title, details }) {
  const classes = useStyles();
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
