import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';

import SplashScreen from './components/SplashScreen';
import Login from './pages/Login';
import RecuperacaoDeSenha from './pages/RecuperacaoDeSenha';
import Cadastro from './pages/Cadastro';
import Painel from './pages/Painel';
import AlertDescription from './pages/AlertDescription';
import NaoEncontrado from './pages/NaoEncontrado';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setTimeout(() => setIsLoading(false), 1000);
        return setIsAuthenticated(true);
      }
      setTimeout(() => setIsLoading(false), 1000);
      return setIsAuthenticated(false);
    });
  }, []);

  return (
    <Switch>
      {isLoading && <SplashScreen />}
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
      <PublicRoute
        path="/404"
        isAuthenticated={isAuthenticated}
        component={NaoEncontrado}
      />
      <PublicRoute
        path="*"
        isAuthenticated={isAuthenticated}
        component={NaoEncontrado}
      />
    </Switch>
  );
}

export default Routes;
