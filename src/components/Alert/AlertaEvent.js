import React from 'react';
import { Typography, makeStyles, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  card: {
    backgroundColor: '#eee',
    border: '1px solid #ddd',
    padding: 15,
    flexGrow: 1,
    margin: 5
  },
  // event: {
  //   marginTop: 20
  // },
  // alertWidth: {
  //   flexGrow: 1
  // },
  fontTitle: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, Sans-Serif',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  }
}));

export default function AlertaEvent({
  severity,
  description,
  eventos,
  coletadoPor,
  ambiente
}) {
  const classes = useStyles();
  return (
    <section className={classes.cards}>
      <div className={classes.card}>
        <Alert variant="filled" severity={severity}>
          {description}
        </Alert>
      </div>
      <div className={classes.card}>
        <Typography variant="h5" className={classes.fontTitle}>
          Ambiente
        </Typography>
        <p>{ambiente}</p>
      </div>
      <div className={classes.card}>
        <Typography variant="h5" className={classes.fontTitle}>
          Eventos
        </Typography>
        <p>{eventos}</p>
      </div>
      <Divider />
      <div className={classes.card}>
        <Typography variant="h5" className={classes.fontTitle}>
          Coletado por
        </Typography>
        <p>{coletadoPor}</p>
      </div>
    </section>
  );
}
