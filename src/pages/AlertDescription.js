import React from 'react';
import {
  Container,
  Button,
  makeStyles,
  Typography,
  Box,
  CircularProgress
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Moment from 'react-moment';
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
  return: {
    margin: theme.spacing(3, 0, 3, 0),
    width: '300px'
  },
  container: {
    marginTop: 20
  },
  event: {
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
        <header>
          <p>Barra do Token</p>
        </header>
        <nav>
          <Button
            className={classes.return}
            variant="contained"
            color="primary"
          >
            VOLTAR
          </Button>
        </nav>
        {!showAlert && <CircularProgress />}
        {showAlert && (
          <div>
            <Typography variant="h3">
              Erro no {alert.origem} em{' '}
              <Moment format="DD/MM/YYYY HH:mm">{alert.criadoEm}</Moment>{' '}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              className={classes.container}
            >
              <section>
                <div>
                  <Typography variant="h5">Título</Typography>
                  <p>{alert.titulo}</p>
                </div>
                <div>
                  <Typography variant="h5">Detalhes</Typography>
                  <p>{alert.detalhes}</p>
                </div>
              </section>
              <section>
                <div>
                  <Alert severity={alertSeverity.severity}>
                    {alertSeverity.description}
                  </Alert>
                </div>
                <div className={classes.event}>
                  <Typography variant="h5">Eventos</Typography>
                  <p>{alert.eventos}</p>
                </div>
                <div>
                  <Typography variant="h5">Coletado por</Typography>
                  <p>{alert.coletadoPor}</p>
                </div>
              </section>
            </Box>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AlertDescription;
