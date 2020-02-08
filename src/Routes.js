import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import * as firebase from 'firebase/app';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated === true ? (
        component({ ...props })
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

const PublicRoute = ({ component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated === false ? component({ ...props }) : <Redirect to="/" />
    }
  />
);

function Routes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return setIsAuthenticated(true);
      }
      return setIsAuthenticated(false);
    });

    return unsubscribe;
  }, []);

  return (
    <Switch>
      <PublicRoute
        path="/login"
        isAuthenticated={isAuthenticated}
        component={Login}
      />
      <PublicRoute
        path="/cadastro"
        isAuthenticated={isAuthenticated}
        component={() => <h1>Cadastro</h1>}
      />
      <PublicRoute
        path="/recuperacao-de-senha"
        isAuthenticated={isAuthenticated}
        component={() => <h1>Recuperação de senha</h1>}
      />
      <PrivateRoute
        exact
        path="/"
        isAuthenticated={isAuthenticated}
        component={() => <h1>Painel</h1>}
      />
    </Switch>
  );
}

export default Routes;
