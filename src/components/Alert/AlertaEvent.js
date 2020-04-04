import React from 'react';
import { Typography, makeStyles, Divider } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

export default function AlertaEvent({
  severity,
  description,
  eventos,
  coletadoPor,
  ambiente
}) {
  const useStyles = makeStyles(theme => ({
    cards: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, Sans-Serif',
      backgroundColor: '#eee',
      border: '1px solid #ddd',
      padding: 15,
      flexGrow: 1,
      flex: '1 1 0px',
      margin: 5
    },
    fontTitle: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, Sans-Serif',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      color: '#2196f3',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem'
      }
    },
    alert: {
      color:
        severity === 'error'
          ? '#f44236'
          : severity === 'warning'
          ? '#ff9700'
          : '#2196f3'
    },
    fontDescription: {
      fontStyle: 'italic',
      marginBottom: 0,
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem'
      }
    }
  }));

  const classes = useStyles();

  return (
    <section className={classes.cards}>
      <div className={`${classes.card} ${classes.alert}`}>
        {severity === 'error' ? (
          <ErrorIcon fontSize="large" />
        ) : severity === 'warning' ? (
          <WarningIcon fontSize="large" />
        ) : (
          <InfoIcon fontSize="large" />
        )}
        <b className={classes.fontDescription}>{description}</b>
      </div>
      <div className={classes.card}>
        <Typography variant="h5" className={classes.fontTitle}>
          Ambiente
        </Typography>
        <p className={classes.fontDescription}>{ambiente}</p>
      </div>
      <div className={classes.card}>
        <Typography variant="h5" className={classes.fontTitle}>
          Eventos
        </Typography>
        <p className={classes.fontDescription}>{eventos}</p>
      </div>
      <Divider />
      <div className={classes.card}>
        <Typography variant="h5" className={classes.fontTitle}>
          Coletado por
        </Typography>
        <p className={classes.fontDescription}>{coletadoPor}</p>
      </div>
    </section>
  );
}
