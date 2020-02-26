import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link } from '@material-ui/core';
import * as firebase from 'firebase/app';

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
    padding: 40
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
        setErrorMessage(error.message);

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
