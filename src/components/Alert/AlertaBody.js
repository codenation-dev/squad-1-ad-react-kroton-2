import React from 'react';
import { Typography, makeStyles, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  event: {
    // marginTop: 10
  },
  divPadding: {
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      padding: 5
    }
  },
  fontTitle: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, Sans-Serif',
    fontWeight: 'bold',
    color: '#1976d3',
    marginBottom: 5,
    paddingLeft: '0.8rem'
  },
  alertaBody: {
    backgroundColor: '#eee',
    border: '1px solid #ddd',
    margin: '0 5px 5px 5px'
  },
  fontDescription: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, Sans-Serif',
    fontWeight: 500,
    fontSize: '1rem',
    marginTop: '1rem',
    paddingLeft: '2rem'
  },
  fontDetails: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, Sans-Serif',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '0.8rem',
    marginTop: '1rem',
    paddingLeft: '2rem'
  }
}));
export default function AlertaBody({ title, details, descricao }) {
  const classes = useStyles();
  return (
    <>
      <section className={classes.alertaBody}>
        <div className={classes.divPadding}>
          <Typography variant="h5" className={classes.fontTitle}>
            {title}
          </Typography>
          <Divider />
          <p className={classes.fontDescription}>{descricao}</p>
          <p className={classes.fontDetails}>-{details}</p>
        </div>
      </section>
    </>
  );
}
