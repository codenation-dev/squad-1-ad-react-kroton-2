import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../firebase/config';
import imageResetPassword from '../images/resetPassword.svg';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 30,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '300px'
  },
  imgSize: {
    height: 50,
    marginBottom: 5
  }
}));

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'primary.main',
  mt: 10,
  border: 1
};

function RecuperacaoDeSenha() {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [showMessage, setShowMessage] = React.useState(false);
  const [severity, setSeverity] = React.useState('error');
  const classes = useStyles();

  async function resetPassword() {
    if (email) {
      await auth
        .sendPasswordResetEmail(email)
        .then(function() {
          setShowMessage(true);
          setSeverity('success');
          setMessage(
            'A password reset email was sent to the given email address.'
          );
        })
        .catch(function(error) {
          setShowMessage(true);
          setMessage(error.message);
        });
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box borderRadius={15} {...defaultProps}>
          <div className={classes.paper}>
            <img
              className={classes.imgSize}
              src={imageResetPassword}
              alt="Reset Password"
            ></img>
            <Typography component="h1" variant="h5">
              Recuperar Senha
            </Typography>
            <TextField
              required
              variant="outlined"
              margin="normal"
              className="meuInput"
              id="email"
              label="e-mail"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            {showMessage && (
              <div className={classes.center}>
                <Alert
                  className={classes.submit}
                  variant="filled"
                  severity={severity}
                >
                  {message}
                </Alert>
                <Link href="/login">Retornar ao Login</Link>
              </div>
            )}
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              onClick={resetPassword}
            >
              Enviar
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default RecuperacaoDeSenha;
