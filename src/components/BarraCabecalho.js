import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  marginBar: {
    marginTop: 10
  },
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
    <div className={classes.marginBar}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            onClick={props.handleArquivar}
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
    </div>
  );
}
