import React from 'react';
import {
  Typography,
  makeStyles,
  Divider,
  Card,
  CardContent
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  event: {
    marginTop: 20
  },
  alertWidth: {
    flexGrow: 1
  },
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
    <section className={classes.alertWidth}>
      <Card>
        <CardContent>
          <div>
            <Alert severity={severity}>{description}</Alert>
          </div>
          <div className={classes.event}>
            <Typography variant="h5" className={classes.fontTitle}>
              Ambiente
            </Typography>
            <p>{ambiente}</p>
          </div>
          <div className={classes.event}>
            <Typography variant="h5" className={classes.fontTitle}>
              Eventos
            </Typography>
            <p>{eventos}</p>
          </div>
          <Divider />
          <div>
            <Typography variant="h5" className={classes.fontTitle}>
              Coletado por
            </Typography>
            <p>{coletadoPor}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
