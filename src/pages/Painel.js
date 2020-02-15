import React from 'react';
import Button from '@material-ui/core/Button';
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
    </div>
  );
}

export default Painel;
