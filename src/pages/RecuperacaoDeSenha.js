import React from 'react';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';
import imageResetPassword from '../images/resetPassword.svg';
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
    }
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
  buttonMargin: {
    marginTop: 30
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
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [showMessage, setShowMessage] = React.useState(false);
  const [severity, setSeverity] = React.useState('error');
  const classes = useStyles();

  const alertClass =
    severity === 'success' ? classes.alertGreen : classes.alertRed;

  async function resetPassword() {
    if (email) {
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
          setShowMessage(true);
          setSeverity('success');
          setMessage(
            'Um e-mail de redefinição de senha foi enviado para o endereço de e-mail fornecido.'
          );
        })
        .catch(function(error) {
          setShowMessage(true);
          setSeverity('error');
          setMessage(errors[error.code] ? errors[error.code] : error.message);
        });
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2}>
        <div className={classes.center}>
          <img
            className={classes.imgSize}
            src={imageResetPassword}
            alt="Reset Password"
          ></img>
          <Typography component="h1" variant="h5">
            Recuperar Senha
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
        <Button
          className={classes.buttonMargin}
          variant="contained"
          color="primary"
          onClick={resetPassword}
          fullWidth
        >
          Enviar
        </Button>
        <div className={classes.returnLogin}>
          <Link href="/login">
            <small>Retornar ao Login</small>
          </Link>
        </div>
      </Paper>
    </div>
  );
}

export default RecuperacaoDeSenha;
