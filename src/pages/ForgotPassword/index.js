import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { auth } from '../../firebase/config';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [firebaseReturn, setFirebaseReturn] = useState(false);

  const resetPassword = () => {
    setFirebaseReturn(true);
    if (email) {
    }
  };
  return (
    <div>
      <Typography variant="h4">Reset Password</Typography>
      <br></br>
      <TextField
        required
        id="email"
        label="E-mail"
        variant="outlined"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <br></br>
      <br></br>
      <Button variant="contained" color="primary" onClick={resetPassword}>
        reset
      </Button>
      <br></br>
      <br></br>
      {firebaseReturn && <CircularProgress />}
    </div>
  );
}
