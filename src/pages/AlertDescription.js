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
  container: {
    marginTop: 20
  }
}));

const getAlertById = async (uid, id) => {
  const db = firebase.firestore();
  return db
    .collection('usuários')
    .doc(uid)
    .collection('alertas')
    .doc(id)
    .get();
};

function AlertDescription(props) {
  const classes = useStyles();
  const [alertSeverity, setAlertSeverity] = React.useState({
    severity: 'error',
    description: 'ERRO'
  });
  const [alert, setAlert] = React.useState({});
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    const { uid } = firebase.auth().currentUser;
    const id = props.match.params.id;

    getAlertById(uid, id).then(r => {
      setAlert(r.data());
      setShowAlert(true);
    });
  }, [props.match.params.id]);

  return (
    <div>
      <BarraUsuario texto="Bem vindo Usuário. Seu token é: 321wwjsjsjsjsjsjsjs" />
      <Paper>
        <Container>
          <AlertaNav />
          {!showAlert && <CircularProgress />}
          {showAlert && (
            <div>
              <AlertaHeader origem={alert.origem} criadoem={alert.criadoEm} />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                className={classes.container}
              >
                <AlertaBody title={alert.titulo} details={alert.detalhes} />
                <AlertaEvent
                  severity={alertSeverity.severity}
                  description={alertSeverity.description}
                  eventos={alert.eventos}
                  coletadoPor={alert.coletadoPor}
                />
              </Box>
            </div>
          )}
        </Container>
      </Paper>
    </div>
  );
}

export default AlertDescription;
