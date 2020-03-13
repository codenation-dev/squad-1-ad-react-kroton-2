import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';

import { ReactComponent as TrackErrLogo } from '../assets/logo_h_b.svg';
import errors from '../errorsPtBR.json';
import { db } from '../firebase/config';

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
    }
  },
  title: {
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '20px'
  },
  buttonMargin: {
    marginTop: 30
  },
  textMargin: {
    marginBottom: 20
  },
  alert: {
    color: '#de1414'
  },
  returnLogin: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30
  }
}));

export default function Cadastro({ history }) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState(false);
  const [erro, setErro] = useState('');

  async function createAccount(event) {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        history.push('/');
      })
      .catch(error => {
        setErro(errors[error.code] ? errors[error.code] : error.message);
        setAlerta(true);
      });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2}>
        <form onSubmit={createAccount} noValidate autoComplete="off">
          <TrackErrLogo />
          <Typography className={classes.title} component="h1" variant="h5">
            Cadastro
          </Typography>

          <div className={classes.textMargin}>
            <TextField
              id="email"
              type="email"
              label="E-mail"
              value={email}
              onChange={event => setEmail(event.target.value)}
              autoComplete="current-email"
              fullWidth
              required
            />
          </div>
          <div>
            <TextField
              type="password"
              id="password"
              label="Senha"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="current-password"
              fullWidth
              required
            />
          </div>

          {alerta && <small className={classes.alert}>{erro}</small>}

          <Button
            className={classes.buttonMargin}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
          >
            Cadastrar
          </Button>
        </form>
        <div className={classes.returnLogin}>
          <Link href="/login">
            <small>Retornar ao Login</small>
          </Link>
        </div>
      </Paper>
    </div>
  );
}
