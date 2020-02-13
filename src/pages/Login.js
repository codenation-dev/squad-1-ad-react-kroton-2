import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <FormControl>
        <TextField id="email" label="Email address" type="e-mail" required />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Button variant="contained" color="default" className={classes.button}>
          Login
        </Button>
      </FormControl>
    </Container>
  );
}

export default Login;
