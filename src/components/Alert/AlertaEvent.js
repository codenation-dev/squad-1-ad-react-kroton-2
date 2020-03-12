import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  event: {
    marginTop: 20
  }
}));

export default function AlertaEvent({
  severity,
  description,
  eventos,
  coletadoPor
}) {
  const classes = useStyles();
  return (
    <section>
      <div>
        <Alert severity={severity}>{description}</Alert>
      </div>
      <div className={classes.event}>
        <Typography variant="h5">Eventos</Typography>
        <p>{eventos}</p>
      </div>
      <div>
        <Typography variant="h5">Coletado por</Typography>
        <p>{coletadoPor}</p>
      </div>
    </section>
  );
}
