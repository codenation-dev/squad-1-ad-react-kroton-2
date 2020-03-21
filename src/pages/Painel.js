import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';

import BarraPesquisa from '../components/BarraPesquisa';
import BarraUsuario from '../components/BarraUsuario';
import BarraCabecalho from '../components/BarraCabecalho';
import Alerta from '../components/Alerta';
import EmptyLista from '../components/EmptyLista';
import { withStyles } from '@material-ui/core/styles';
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
  CircularProgress
} from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
  head: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    backgroundColor: '#5d5d5d1f',
    color: 'black',
    padding: 10,
    borderTop: '2px solid #1976d3',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

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
              <Container>
                <BarraCabecalho
                  handleArquivar={handleArquivar}
                  handleDeletar={handleDeletar}
                ></BarraCabecalho>
                <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          style={{ width: '20px', padding: 0 }}
                        />
                        <StyledTableCell align="center">Level</StyledTableCell>
                        <StyledTableCell align="center">Log</StyledTableCell>
                        <StyledTableCell align="center">
                          Eventos
                        </StyledTableCell>
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
