import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';

import BarraPesquisa from '../components/BarraPesquisa';
import BarraUsuario from '../components/BarraUsuario';
import BarraCabecalho from '../components/BarraCabecalho';
import Alerta from '../components/Alerta';
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

export default function ErroLista() {
  const [alertas, setAlertas] = useState([]);
  const [checkados, setCheckados] = useState([]);
  const [page, setPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

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

  useEffect(() => {
    listaAlertas();
  }, []);

  const rowsPerPage = 10;

  return (
    <div>
      <BarraUsuario
        texto={`Bem vindo ${firebase.auth().currentUser.email}`}
      ></BarraUsuario>
      <BarraPesquisa></BarraPesquisa>
      <BarraCabecalho
        handleArquivar={handleArquivar}
        handleDeletar={handleDeletar}
      ></BarraCabecalho>
      {!isLoading && <CircularProgress />}
      {isLoading && (
        <Container>
          <TableContainer component={Paper} style={{ marginTop: '10px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">Level</TableCell>
                  <TableCell align="center">Log</TableCell>
                  <TableCell align="center">Eventos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alertas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    count={alertas.length}
                    page={page}
                    onChangePage={handleChangePage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Container>
      )}
    </div>
  );
}
