import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Link } from '@material-ui/core';
import * as firebase from 'firebase/app';

import { ReactComponent as TrackErrLogo } from '../assets/logo_h_b.svg';
import errors from '../errorsPtBR.json';

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
    marginBottom: '5px'
  },
  title: {
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '20px'
  },
  textMargin: {
    marginBottom: 20
  },
  alert: {
    color: '#de1414'
  },
  buttonMargin: {
    marginTop: 30
  },
  forgotPass: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30
  }
}));

function Login({ history }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function validateLogin(event) {
    event.preventDefault();
    setErrorPassword(false);
    setErrorEmail(false);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        history.push('/');
      })
      .catch(error => {
        const errorCode = error.code;
        setErrorMessage(errors[errorCode] ? errors[errorCode] : error.message);

        if (errorCode === 'auth/wrong-password') {
          setErrorPassword(true);
        } else {
          setErrorEmail(true);
        }
      });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2}>
        <TrackErrLogo />
        <Typography className={classes.title} component="h1" variant="h5">
          Acesse sua conta
        </Typography>

        <form onSubmit={validateLogin} noValidate autoComplete="off">
          <div className={classes.textMargin}>
            <TextField
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="E-mail"
              type="email"
              autoComplete="current-email"
              fullWidth
              required
            />
            {errorEmail && (
              <small className={classes.alert}>{errorMessage}</small>
            )}
          </div>
          <div>
            <TextField
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Senha"
              type="password"
              autoComplete="current-password"
              fullWidth
              required
            />
            {errorPassword && (
              <small className={classes.alert}>{errorMessage}</small>
            )}
          </div>
          <Button
            className={classes.buttonMargin}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
          >
            Login
          </Button>
          <div className={classes.forgotPass}>
            <Link href="/recuperacao-de-senha">
              <small>Esqueceu a senha?</small>
            </Link>
          </div>
        </form>
      </Paper>
      <div>
        <small>
          Ainda não possuí cadastro? <Link href="/cadastro">Entre aqui</Link>
        </small>
      </div>
    </div>
  );
}

export default Login;
