import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import * as firebase from 'firebase/app';
import { ReactComponent as Logo } from '../assets/logo_s_v_b.svg';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    fontSize: '15px'
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'white',
    '&:hover': {
      borderColor: 'white'
    }
  }
}));

export default function BarraUsuario(props) {
  const classes = useStyles();

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <Typography variant="h6" className={classes.title}>
            {props.texto}
          </Typography>
          <nav>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleSignOut}
              className={classes.link}
            >
              Logout
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}
