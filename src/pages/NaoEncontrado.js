import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NotFoundImg from '../assets/notfound.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
  paper: {
    width: 380,
    padding: 40,
    [theme.breakpoints.down('sm')]: {
      width: 345
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  link: {
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    backgroundColor: '#1976D2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#115293',
      transitionDuration: '0.5s',
      color: 'white',
      textDecoration: 'none'
    },
    '&:active': { textDecoration: 'none', color: 'white' }
  }
}));

function NaoEncontrado({ history }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2}>
        <div>
          <img src={NotFoundImg} alt="404" width="300"></img>
          <Typography className={classes.title} component="h1" variant="h5">
            Oops...
          </Typography>
          <Typography className={classes.subtitle} component="h1" variant="h6">
            A página que você tentou acessar não existe!
          </Typography>
        </div>
        <Link to="/" className={classes.link}>
          VOLTAR
        </Link>
      </Paper>
    </div>
  );
}

export default NaoEncontrado;
