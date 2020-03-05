import React from 'react';
import {
  Container,
  Button,
  makeStyles,
  Typography,
  Chip,
  Box
} from '@material-ui/core';

const getAlertById = async id => {
  const response = await fetch(``);

  // tratamento do retorno
  // se não existir > 404
  // se exist > response.json()
};

const useStyles = makeStyles(theme => ({
  return: {
    margin: theme.spacing(3, 0, 3, 0),
    width: '300px'
  },
  container: {
    marginTop: 20
  }
}));

function AlertDescription(props) {
  const classes = useStyles();
  const [chipColor, setChipColor] = React.useState('secondary');
  const [alert, setAlert] = React.useState({});

  React.useEffect(() => {
    const alertId = props.match.params.id;
    /*
    getAlertById(alertId).then(r => setAlert(r))
    */
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
        <section>
          <Typography variant="h3">
            Erro no 127.0.0.1 em 24/05/2019 10:15
          </Typography>
        </section>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          className={classes.container}
        >
          <section>
            <div>
              <Typography variant="h5">Título</Typography>
              <p>acceleration.Service.AddCandidate: forbidden</p>
            </div>
            <div>
              <Typography variant="h5">Detalhes</Typography>
              <p>Detail 1</p>
              <p>Detail 2</p>
            </div>
          </section>
          <section>
            <div>
              <Chip color={chipColor} size="small" label="ERRO" />
            </div>
            <div>
              <Typography variant="h5">Eventos</Typography>
              <p>1000</p>
            </div>
            <div>
              <Typography variant="h5">Coletado por</Typography>
              <p>Token do usuário X</p>
            </div>
          </section>
        </Box>
      </Container>
    </div>
  );
}

export default AlertDescription;
