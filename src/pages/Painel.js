import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';

function Painel() {
  return (
    <div>
      <h1>Painel</h1>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => firebase.auth().signOut()}
      >
        Sair
      </Button>
      {/* apenas para teste */}
      <Link to="/alert/1">Teste</Link>
    </div>
  );
}

export default Painel;
