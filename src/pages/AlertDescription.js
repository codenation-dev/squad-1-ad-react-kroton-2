import React from 'react';
import { Container, Button, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Painel from './Painel';

const useStyles = makeStyles(theme => ({
  return: {
    margin: theme.spacing(3, 0, 3, 0),
    width: '300px'
  }
}));

function AlertDescription(props) {
  const classes = useStyles();

  React.useEffect(() => {
    const alertId = props.match.params.id;
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
        <section>
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
              <Typography variant="h5">Eventos</Typography>
              <p>1000</p>
            </div>
            <div>
              <Typography variant="h5">Coletado por</Typography>
              <p>Token do usuário X</p>
            </div>
          </section>
        </section>
      </Container>
    </div>
  );
}

export default AlertDescription;
