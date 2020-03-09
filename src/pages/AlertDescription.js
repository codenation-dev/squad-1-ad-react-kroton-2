import React from 'react';
import {
  Container,
  makeStyles,
  Typography,
  Box,
  CircularProgress,
  ButtonBase,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import AlertaEvent from '../components/Alert/AlertaEvent';
import AlertaBody from '../components/Alert/AlertaBody';
import AlertaHeader from '../components/Alert/AlertaHeader';

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
  },
  event: {
    marginTop: 20
  },
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
