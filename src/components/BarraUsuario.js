import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core';
import * as firebase from 'firebase/app';
import { ReactComponent as Logo } from '../assets/logo_s_v_b.svg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
    fontSize: '15px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    }
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'white',
    '&:hover': {
      borderColor: 'white'
    }
  },
  logo: {
    minWidth: '100px'
  },
  colorLogout: {
    color: '#fff'
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
          <Logo className={classes.logo} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              flexGrow: 1
            }}
          >
            <Typography variant="h6" className={classes.title}>
              {props.texto}
            </Typography>
          </div>
          <nav>
            <Tooltip title="Logout" aria-label="Logout">
              <IconButton onClick={handleSignOut}>
                <ExitToAppIcon className={classes.colorLogout} />
              </IconButton>
            </Tooltip>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}
