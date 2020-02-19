import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';
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

  const errorCodes = [
    {
      code: 'auth/invalid-email',
      description: 'O endereço de e-mail não é válido'
    },
    {
      code: 'auth/missing-android-pkg-name',
      description:
        'Um nome de pacote Android deve ser fornecido se o aplicativo Android precisar ser instalado.'
    },
    {
      code: 'auth/missing-continue-uri',
      description: 'Uma URL de continuação deve ser fornecida na solicitação.'
    },
    {
      code: 'auth/missing-ios-bundle-id',
      description:
        'Um ID do pacote iOS deve ser fornecido se um ID da App Store for fornecido.'
    },
    {
      code: 'auth/invalid-continue-uri',
      description: 'A URL de continuação fornecida na solicitação é inválida.'
    },
    {
      code: 'auth/unauthorized-continue-uri',
      description:
        'O domínio da URL de continuação não está na lista de permissões.'
    },
    {
      code: 'auth/user-not-found',
      description: 'Não há usuário correspondente ao endereço de email.'
    }
  ];

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
          const result = errorCodes.find(function(errorCode) {
            return error.code === errorCode.code
              ? errorCode.description
              : {
                  code: 'auth/unknow',
                  description: 'Erro desconhecido'
                };
          });

          setShowMessage(true);
          setSeverity('error');
          setMessage(result.description);
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
