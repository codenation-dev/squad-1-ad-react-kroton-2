import React, { useEffect, useState } from 'react';
import BarraPesquisa from '../components/BarraPesquisa';
import BarraUsuario from '../components/BarraUsuario';
import BarraCabecalho from '../components/BarraCabecalho';
import Eventos from '../components/Eventos';
import * as firebase from 'firebase/app';
import { db } from '../firebase/config';

export default function ErroLista() {
  const [alertas, setAlertas] = useState([]);
  const [checkados, setCheckados] = useState([]);

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
      listaAlertas();
      setCheckados([]);
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
      listaAlertas();
      setCheckados([]);
    } catch (error) {
      console.log(error);
    }
  };

  const listaAlertas = () => {
    db.collection('usuários')
      .doc(firebase.auth().currentUser.uid)
      .collection('alertas')
      .get()
      .then(querySnapshot => {
        setAlertas(querySnapshot.docs);
        const data = querySnapshot.docs.map(doc => doc.data());
      });
  };

  useEffect(() => {
    listaAlertas();
  }, []);

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
      {alertas.map((e, index) => {
        return (
          <Eventos
            setCheckados={setCheckados}
            checkados={checkados}
            key={index}
            id={e.id}
            evento={e.data()}
          ></Eventos>
        );
      })}
    </div>
  );
}
