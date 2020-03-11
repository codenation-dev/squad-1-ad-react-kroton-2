import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';
import Login from './pages/Login';
import RecuperacaoDeSenha from './pages/RecuperacaoDeSenha';
import Cadastro from './pages/Cadastro';
import Painel from './pages/Painel';
import AlertDescription from './pages/AlertDescription';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    component={props =>
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
    component={props =>
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
        component={Cadastro}
      />
      <PublicRoute
        path="/recuperacao-de-senha"
        isAuthenticated={isAuthenticated}
        component={RecuperacaoDeSenha}
      />
      <PrivateRoute
        exact
        path="/"
        isAuthenticated={isAuthenticated}
        component={Painel}
      />
      <PrivateRoute
        exact
        path="/alert/:id"
        isAuthenticated={isAuthenticated}
        component={AlertDescription}
      />
    </Switch>
  );
}

export default Routes;
