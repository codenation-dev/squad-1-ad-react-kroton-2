import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import WorkIcon from '@material-ui/icons/Work';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  marginBar: {
    marginTop: 10
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  submit: {
    fontSize: '12px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    margin: theme.spacing(1, 2, 0, 0)
  },
  buttonFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  labelLeft: {
    marginLeft: 6
  }
}));

export default function BarraCabecalho(props) {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div>
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            onClick={props.handleArquivar}
            startIcon={<WorkIcon />}
          >
            Arquivar
          </Button>
          <Button
            className={classes.submit}
            variant="contained"
            color="secondary"
            onClick={props.handleDeletar}
            startIcon={<DeleteIcon />}
          >
            Apagar
          </Button>
        </div>
      </div>
    </div>
  );
}
