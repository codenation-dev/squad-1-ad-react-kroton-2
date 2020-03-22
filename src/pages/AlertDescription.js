import React from 'react';
import {
  Paper,
  makeStyles,
  Box,
  CircularProgress,
  Container
} from '@material-ui/core';
import * as firebase from 'firebase/app';

import AlertaEvent from '../components/Alert/AlertaEvent';
import AlertaBody from '../components/Alert/AlertaBody';
import AlertaHeader from '../components/Alert/AlertaHeader';
import AlertaNav from '../components/Alert/AlertaNav';
import BarraUsuario from '../components/BarraUsuario';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: 20,
    position: 'relative'
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
    flexGrow: 1,
    border: '1px solid #ddd'
  },
  fillContent: {
    width: '95%'
  },
  boxBody: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
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
  const [id, setId] = React.useState('');
  const [uid, setUid] = React.useState('');
  const [arquivado, setArquivado] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const { uid } = firebase.auth().currentUser;
    const id = props.match.params.id;

    getAlertById(uid, id)
      .then(response => {
        setAlert(response.data());
        setId(id);
        setUid(uid);
        setArquivado(response.data().arquivado);
        setIsLoading(true);
      })
      .catch(() => props.history.push('/'));
  }, [props.history, props.match.params.id]);

  return (
    <div className={classes.flexScreen}>
      <BarraUsuario texto={`Bem vindo ${firebase.auth().currentUser.email}`} />
      <AlertaNav id={id} uid={uid} arquivado={arquivado} />
      <div className={classes.box}>
        <div className={classes.fillContent}>
          {/* <Paper className={classes.paper}> */}
          <Container>
            {!isLoading && (
              <CircularProgress style={{ marginLeft: '50%' }} left={-20} />
            )}
            {isLoading && (
              <div>
                <AlertaHeader origem={alert.origem} criadoem={alert.criadoEm} />
                {/* <Box> */}
                {/* <div> */}
                <AlertaEvent
                  severity={alert.level === 'debug' ? 'info' : alert.level}
                  description={alert.level.toUpperCase()}
                  eventos={alert.eventos}
                  coletadoPor={alert.coletadoPor}
                  ambiente={alert.ambiente}
                />
                <AlertaBody
                  title={alert.titulo}
                  details={alert.detalhes}
                  descricao={alert.descricao}
                />
                {/* </div> */}
                {/* </Box> */}
              </div>
            )}
          </Container>
          {/* </Paper> */}
        </div>
      </div>
    </div>
  );
}

export default AlertDescription;
