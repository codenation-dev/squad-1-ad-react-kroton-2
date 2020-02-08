import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import * as firebase from 'firebase/app';

const PrivateRoute = ({ component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authed === true ? (
        component({ ...props })
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const PublicRoute = ({ component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authed === false ? component({ ...props }) : <Redirect to="/painel" />
    }
  />
);

function Routes() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return setAuthed(true);
      }
      return setAuthed(false);
    });

    return unsubscribe;
  }, []);

  return (
    <Switch>
      <PublicRoute path="/" exact authed={authed} component={Login} />
      <PublicRoute
        path="/cadastro"
        authed={authed}
        component={() => <h1>Cadastro</h1>}
      />
      <PublicRoute
        path="/recuperacao-de-senha"
        authed={authed}
        component={() => <h1>Recuperação de senha</h1>}
      />
      <PrivateRoute
        path="/painel"
        authed={authed}
        component={() => <h1>Painel</h1>}
      />
    </Switch>
  );
}

export default Routes;
