import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { auth } from '../../firebase/config';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  async function resetPassword() {
    if (email) {
      await auth
        .sendPasswordResetEmail(email)
        .then(function() {
          console.log('ok');
        })
        .catch(function(error) {
          setOpen(true);
          setErrorMessage(error.message);
          setTimeout(function() {
            setOpen(false);
          }, 3000);
        });
    }
  }

  return (
    <div>
      <Container>
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

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Error</h2>
                <p id="transition-modal-description">{errorMessage}</p>
              </div>
            </Fade>
          </Modal>
        </div>
      </Container>
    </div>
  );
}
