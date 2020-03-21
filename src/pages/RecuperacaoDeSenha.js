import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';

import { ReactComponent as TrackErrLogo } from '../assets/logo_h_b.svg';
import errors from '../errorsPtBR.json';
import LoadingButton from '../components/LoadingButton';

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
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    marginTop: theme.spacing(1)
  },
  imgSize: {
    height: 50,
    marginBottom: 5
  },
  alertRed: {
    color: '#de1414'
  },
  alertGreen: {
    color: '#43a047'
  },
  returnLogin: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30
  }
}));

function RecuperacaoDeSenha() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const alertClass =
    severity === 'success' ? classes.alertGreen : classes.alertRed;

  async function resetPassword() {
    if (email) {
      await setIsLoading(true);
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
          setShowMessage(true);
          setSeverity('success');
          setMessage(
            'Um e-mail de redefinição de senha foi enviado para o endereço de e-mail fornecido.'
          );
          setIsLoading(false);
        })
        .catch(function(error) {
          setShowMessage(true);
          setSeverity('error');
          setMessage(errors[error.code] ? errors[error.code] : error.message);
          setIsLoading(false);
        });
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2}>
        <div className={classes.center}>
          <TrackErrLogo />
          <Typography className={classes.title} component="h1" variant="h5">
            Recuperação de senha
          </Typography>
        </div>
        <TextField
          className="meuInput"
          id="email"
          label="E-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
          fullWidth
          required
        />
        {showMessage && (
          <>
            <div>
              <small className={alertClass}>{message}</small>
            </div>
          </>
        )}
        <LoadingButton isLoading={isLoading} onClick={resetPassword}>
          Enviar
        </LoadingButton>
        <div className={classes.returnLogin}>
          <Link to="/login">
            <small>Retornar ao Login</small>
          </Link>
        </div>
      </Paper>
    </div>
  );
}

export default RecuperacaoDeSenha;
