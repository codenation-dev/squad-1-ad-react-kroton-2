import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import WorkOffIcon from '@material-ui/icons/WorkOff';

import * as firebase from 'firebase/app';
import { db } from '../../firebase/config';

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
  },
  flexRow: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e3e3e3',
    height: 60
  },
  buttonFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  labelLeft: {
    marginLeft: 3
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertaNav({ origem, criadoem, id, uid, arquivado }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [record, setRecord] = React.useState(arquivado);

  const handleDesarquivar = () => {
    desarquivar(firebase.auth().currentUser.uid, id);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    debugger;
    setOpen(false);
  };

  React.useEffect(() => {
    setRecord(arquivado);
  }, [arquivado]);

  const desarquivar = async (uid, idAlerta) => {
    try {
      await db
        .collection('usuários')
        .doc(uid)
        .collection('alertas')
        .doc(idAlerta)
        .update({ arquivado: false });
      setOpen(true);
      setRecord(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav className={classes.flexRow}>
        <Button component={Link} to="/" variant="outlined">
          <div className={classes.buttonFlex}>
            <ArrowBackIcon /> <span className={classes.labelLeft}>Voltar</span>
          </div>
        </Button>
        {record && (
          <Button
            onClick={handleDesarquivar}
            variant="outlined"
            color="secondary"
          >
            <div className={classes.buttonFlex}>
              <WorkOffIcon />{' '}
              <span className={classes.labelLeft}>Desarquivar</span>
            </div>
          </Button>
        )}
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Alerta desarquivado com sucesso!
          </Alert>
        </Snackbar>
      </nav>
    </div>
  );
}
