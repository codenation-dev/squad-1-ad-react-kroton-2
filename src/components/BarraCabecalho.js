import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 3),
    width: '300px'
  }
}));

export default function BarraCabecalho(props) {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />

      <AppBar position="relative" color="default" elevation={1}>
        <Toolbar>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <div style={{ marginBottom: '20px' }}>
              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                onClick={props.handleArquivar}
                //onClick={}
              >
                Arquivar
              </Button>
              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                onClick={props.handleDeletar}
              >
                Apagar
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
