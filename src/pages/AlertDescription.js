import React from 'react';
import {
  Container,
  makeStyles,
  Box,
  CircularProgress
} from '@material-ui/core';
import AlertaEvent from '../components/Alert/AlertaEvent';
import AlertaBody from '../components/Alert/AlertaBody';
import AlertaHeader from '../components/Alert/AlertaHeader';
import AlertaNav from '../components/Alert/AlertaNav';

const getAlertById = async id => {
  const response = await fetch(``);

  // tratamento do retorno
  // se não existir > 404
  // se exist > response.json()
  return {
    detalhes: 'Sorry, that page cannot be found. Page: /produtos/458796',
    descricao: 'Ipsum dolor...',
    titulo: 'Erro 404',
    ambiente: 'Produção',
    origem: '10.0.1.1',
    coletadoPor: 'usuário XPTO',
    eventos: 2728,
    level: 'debug',
    criadoEm: '2020-03-05T14:08:57.725Z',
    arquivado: false
  };
};

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20
  }
}));

function AlertDescription(props) {
  const classes = useStyles();
  const [alertSeverity, setAlertSeverity] = React.useState({
    severity: 'error',
    description: 'ERRO'
  });
  const [alert, setAlert] = React.useState({});
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    const alertId = props.match.params.id;
    getAlertById(alertId).then(r => {
      setAlert(r);
      setTimeout(() => {
        setShowAlert(true);
      }, 500);
    });
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default AlertDescription;
