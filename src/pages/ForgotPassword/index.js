import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const resetPassword = () => {
    if (email) {
      console.log(email);
    }
  };
  return (
    <div>
      <Typography variant="h4">Reset Password</Typography>
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
    </div>
  );
}
