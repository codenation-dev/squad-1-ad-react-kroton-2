import React from 'react';
import {
  Paper,
  Container,
  makeStyles,
  Box,
  CircularProgress
} from '@material-ui/core';
import * as firebase from 'firebase/app';

import AlertaEvent from '../components/Alert/AlertaEvent';
import AlertaBody from '../components/Alert/AlertaBody';
import AlertaHeader from '../components/Alert/AlertaHeader';
import AlertaNav from '../components/Alert/AlertaNav';
import BarraUsuario from '../components/BarraUsuario';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 30,
    padding: 30
  },
  flexScreen: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh'
  },
  box: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    flexGrow: 1
  },
  fillContent: {
    width: '95%'
  }
}));

const getAlertById = async (uid, id) => {
  const db = firebase.firestore();
  return await db
    .collection('usuários')
    .doc(uid)
    .collection('alertas')
    .doc(id)
    .get();
};

function AlertDescription(props) {
  const classes = useStyles();
  const [alert, setAlert] = React.useState({});
  const [showAlert, setShowAlert] = React.useState(false);
  const [id, setId] = React.useState('');
  const [uid, setUid] = React.useState('');
  const [arquivado, setArquivado] = React.useState(false);

  React.useEffect(() => {
    const { uid } = firebase.auth().currentUser;
    const id = props.match.params.id;

    getAlertById(uid, id).then(response => {
      setAlert(response.data());
      setShowAlert(true);
      setId(id);
      setUid(uid);
      setArquivado(response.data().arquivado);
    });
  }, [props.match.params.id]);

  return (
    <div className={classes.flexScreen}>
      <BarraUsuario texto="Bem vindo Usuário. Seu token é: 321wwjsjsjsjsjsjsjs" />
      <AlertaNav id={id} uid={uid} arquivado={arquivado} />
      <div className={classes.box}>
        <div className={classes.fillContent}>
          <Paper className={classes.paper}>
            {/* <Container> */}
            {!showAlert && <CircularProgress />}
            {showAlert && (
              <div>
                <AlertaHeader origem={alert.origem} criadoem={alert.criadoEm} />
                <Box display="flex" flexDirection="row">
                  <AlertaBody title={alert.titulo} details={alert.detalhes} />
                  <AlertaEvent
                    severity={alert.level === 'debug' ? 'info' : alert.level}
                    description={alert.level.toUpperCase()}
                    eventos={alert.eventos}
                    coletadoPor={alert.coletadoPor}
                  />
                </Box>
              </div>
            )}
            {/* </Container> */}
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default AlertDescription;
