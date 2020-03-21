import React from 'react';
import { Typography, makeStyles, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  event: {
    marginTop: 20
  },
  alertWidth: {
    flexGrow: 4,
    padding: 15
  },
  divPadding: {
    padding: 15
  },
  fontTitle: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, Sans-Serif',
    fontWeight: 'bold'
  }
}));
export default function AlertaBody({ title, details, descricao }) {
  const classes = useStyles();
  return (
    <>
      <section className={classes.alertWidth}>
        <div className={classes.divPadding}>
          <Typography variant="h5" className={classes.fontTitle}>
            Título
          </Typography>
          <p>{title}</p>
        </div>
        <Divider />
        <div className={classes.divPadding}>
          <Typography variant="h5" className={classes.fontTitle}>
            Descrição
          </Typography>
          <p>{descricao}</p>
        </div>
        <Divider />
        <div className={classes.divPadding}>
          <Typography variant="h5" className={classes.fontTitle}>
            Detalhes
          </Typography>
          <p>{details}</p>
        </div>
      </section>
    </>
  );
}
