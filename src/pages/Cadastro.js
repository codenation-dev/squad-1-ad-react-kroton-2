import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import * as firebase from 'firebase/app';
import errors from '../errorsPtBR.json';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '300px',
  },
}));

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'primary.main',
  mt: 10,
  border: 1
};

export default function Cadastro({ history }) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState(false);
  const [erro, setErro] = useState('');

  async function createAccount() {
    try {
      const usuario = await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert("Usuário cadastro com sucesso.");
      history.push('/Painel');
    } catch (error) {
      setErro(errors[error.code] ? errors[error.code] : error.message);
      setAlerta(true);
      console.log(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs" >
      <Box borderRadius={15} {...defaultProps}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Cadastro
                </Typography>

          <TextField
            required
            variant="outlined"
            margin="normal"
            className="meuInput"
            id="email"
            type="email"
            label="e-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <TextField
            required
            variant="outlined"
            margin="normal"
            className="meuInput"
            type="password"
            id="password"
            label="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          {alerta &&
            <Alert className={classes.submit} variant="filled" severity="error">{erro}</Alert>
          }

          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            onClick={createAccount}>
            Cadastrar
                </Button>
        </div>
      </Box>
    </Container>
  )
}
