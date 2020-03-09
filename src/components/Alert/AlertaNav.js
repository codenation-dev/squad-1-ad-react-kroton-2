import React from 'react';
import {
  ButtonBase,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  btnVoltar: {
    margin: theme.spacing(3, 0, 3, 0),
    backgroundColor: '#1976d2',
    width: 200,
    borderRadius: 5,
    '&:hover': { backgroundColor: '#115293', transitionDuration: '0.5s' }
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    '&:hover': { textDecoration: 'none', color: 'white' },
    '&:active': { textDecoration: 'none', color: 'white' }
  }
}));

export default function AlertaHeader({ origem, criadoem }) {
  const classes = useStyles();
  return (
    <div>
      <header>
        <p>Barra do Token</p>
      </header>
      <nav>
        <ButtonBase>
          <BottomNavigation className={classes.btnVoltar}>
            <BottomNavigationAction
              label="VOLTAR"
              showLabel="true"
              component={Link}
              to="/"
              className={classes.label}
            />
          </BottomNavigation>
        </ButtonBase>
      </nav>
    </div>
  );
}
