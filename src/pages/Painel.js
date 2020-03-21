import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';

import BarraPesquisa from '../components/BarraPesquisa';
import BarraUsuario from '../components/BarraUsuario';
import BarraCabecalho from '../components/BarraCabecalho';
import Alerta from '../components/Alerta';
import EmptyLista from '../components/EmptyLista';
import { db } from '../firebase/config';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  TableFooter,
  TablePagination,
  CircularProgress,
  Checkbox
} from '@material-ui/core';

export default function ErroLista() {
  const [alertas, setAlertas] = useState([]);
  const [checkados, setCheckados] = useState([]);
  const [page, setPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [filters, setFilters] = useState({
    search: '',
    searchBy: '',
    orderBy: '',
    type: ''
  });
  const [checkAll, setCheckAll] = useState(false);

  const handleArquivar = () => {
    checkados.map(item => arquivar(firebase.auth().currentUser.uid, item));
  };

  const handleDeletar = () => {
    checkados.map(item => deletar(firebase.auth().currentUser.uid, item));
  };

  const deletar = async (uid, idAlerta) => {
    try {
      await db
        .collection('usuários')
        .doc(uid)
        .collection('alertas')
        .doc(idAlerta)
        .delete();

      setCheckAll(false);
      return setCheckados([]);
    } catch (error) {
      console.log(error);
    }
  };

  const arquivar = async (uid, idAlerta) => {
    try {
      await db
        .collection('usuários')
        .doc(uid)
        .collection('alertas')
        .doc(idAlerta)
        .update({ arquivado: true });

      setCheckAll(false);
      setCheckados([]);
    } catch (error) {
      console.log(error);
    }
  };

  const listaAlertas = () => {
    db.collection('usuários')
      .doc(firebase.auth().currentUser.uid)
      .collection('alertas')
      .orderBy('criadoEm', 'desc')
      .onSnapshot(querySnapshot => {
        setAlertas(querySnapshot.docs);
        setIsLoading(true);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (value, event) => {
    event.preventDefault();

    setFilters(prevState => {
      return {
        ...prevState,
        search: value
      };
    });
  };

  const handleSearchBy = event => {
    const { value } = event.target;

    setFilters(prevState => {
      return {
        ...prevState,
        searchBy: value
      };
    });
  };

  const handleOrderBy = event => {
    const { value } = event.target;

    setFilters(prevState => {
      return {
        ...prevState,
        orderBy: value
      };
    });
  };

  const handleType = event => {
    const { value } = event.target;

    setFilters(prevState => {
      return {
        ...prevState,
        type: value
      };
    });
  };

  const _filterAlertsBySearch = alertas => {
    if (!!filters.searchBy) {
      return (
        alertas
          .data()
          [filters.searchBy].toLowerCase()
          .indexOf(filters.search.toLowerCase()) > -1
      );
    }

    return alertas.data();
  };

  const _sortAlertsBy = (prevAlertas, alertas) => {
    if (prevAlertas.data()[filters.orderBy] > alertas.data()[filters.orderBy]) {
      return -1;
    }

    if (prevAlertas.data()[filters.orderBy] < alertas.data()[filters.orderBy]) {
      return 1;
    }

    return 0;
  };

  const _filterAlertsByType = alertas => {
    if (!!filters.type) {
      return (
        alertas
          .data()
          .ambiente.toLowerCase()
          .indexOf(filters.type.toLowerCase()) > -1
      );
    }

    return alertas.data();
  };

  useEffect(() => {
    listaAlertas();
  }, []);

  const handleCheckAll = event => {
    if (event.target.checked) {
      alertas.map(alerta => {
        setCheckados(x => x.concat(alerta.id));
      });
      setCheckAll(true);
    } else {
      setCheckados([]);
      setCheckAll(false);
    }
  };

  const rowsPerPage = 10;
  const alertsCount = alertas
    .filter(_filterAlertsByType)
    .filter(_filterAlertsBySearch).length;

  return (
    <div>
      <BarraUsuario
        texto={`Bem vindo ${firebase.auth().currentUser.email}`}
      ></BarraUsuario>
      {!isLoading && (
        <CircularProgress style={{ marginLeft: '50%' }} left={-20} />
      )}
      {isLoading && (
        <>
          <BarraPesquisa
            setAlertas={setAlertas}
            handleSearch={handleSearch}
            handleSearchBy={handleSearchBy}
            handleOrderBy={handleOrderBy}
            handleType={handleType}
            searchBy={filters.searchBy}
            orderBy={filters.orderBy}
            type={filters.type}
            setFilters={setFilters}
            listaAlertas={listaAlertas}
          ></BarraPesquisa>
          {alertas.length === 0 && <EmptyLista />}
          {alertas.length !== 0 && (
            <>
              <BarraCabecalho
                handleArquivar={handleArquivar}
                handleDeletar={handleDeletar}
              ></BarraCabecalho>
              <Container>
                <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          {' '}
                          <Checkbox
                            checked={checkAll}
                            onChange={handleCheckAll}
                            value="primary"
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </TableCell>
                        <TableCell align="center">Level</TableCell>
                        <TableCell align="center">Log</TableCell>
                        <TableCell align="center">Eventos</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {alertas
                        .filter(_filterAlertsByType)
                        .filter(_filterAlertsBySearch)
                        .sort(_sortAlertsBy)
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((alerta, index) => {
                          return (
                            <Alerta
                              setCheckados={setCheckados}
                              checkados={checkados}
                              key={index}
                              id={alerta.id}
                              alerta={alerta.data()}
                            ></Alerta>
                          );
                        })}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[10]}
                          rowsPerPage={rowsPerPage}
                          count={alertsCount}
                          page={page}
                          onChangePage={handleChangePage}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Container>
            </>
          )}
        </>
      )}
    </div>
  );
}
