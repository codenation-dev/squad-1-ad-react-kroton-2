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
        <p>Barra do Token</p>
        <Button className={classes.return} variant="contained" color="primary">
          VOLTAR
        </Button>

        <Typography component="h1" variant="h5">
          Recuperar Senha
        </Typography>
      </Container>
    </div>
  );
}

export default AlertDescription;
