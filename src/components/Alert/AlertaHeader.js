import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Moment from 'react-moment';

const useStyles = makeStyles(theme => ({
  fontHeader: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, Sans-Serif',
    fontWeight: 500,
    fontSize: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    }
  },
  alertaHeader: {
    backgroundColor: '#ebebeb',
    borderTop: '2px solid #1976d3',
    padding: '10px 0',
    marginTop: 10
  }
}));

export default function AlertaHeader({ origem, criadoem }) {
  const classes = useStyles();

  return (
    <div className={classes.alertaHeader}>
      <Typography variant="h3" align="center" className={classes.fontHeader}>
        Erro no {origem} em{' '}
        <Moment unix format="DD/MM/YYYY HH:mm">
          {criadoem.seconds}
        </Moment>{' '}
      </Typography>
    </div>
  );
}
