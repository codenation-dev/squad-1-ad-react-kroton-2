import React, { useEffect, useState } from 'react';
import BarraDois from '../components/BarraDois';
import BarraUm from '../components/BarraUm';
import BarraSimples from '../components/BarraSimples';
import Eventos from '../components/Eventos';
import * as firebase from 'firebase/app';
import { db } from '../firebase/config';

const eventos = [
  {
    id: 1,
    level: 'error',
    descricao: 'descricao do erro',
    origem: 'origem do erro',
    dataHora: '01/01/2020 11:10:55',
    codigo: 1000
  },
  {
    id: 2,
    level: 'warning',
    descricao: 'só um aviso',
    origem: 'react',
    dataHora: '01/01/2020 11:10:55',
    codigo: 200
  },
  {
    id: 3,
    level: 'debug',
    descricao: 'not found',
    origem: 'classe 2',
    dataHora: '01/01/2020 11:10:55',
    codigo: 30
  }
];

export default function ErroLista() {
  const [alertas, setAlertas] = useState([]);
  const [checkados, setCheckados] = useState([]);
  const arrayapagar = [];

  // useEffect(() => {
  //   db.collection("usuários")
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then((querySnapshot) => {
  //       console.log(querySnapshot)
  //     });
  // }, [])

  const handleArquivar = () => {
    checkados.map(item => setArquivado(firebase.auth().currentUser.uid, item));
  };

  const handleDeletar = () => {
    checkados.map(item =>
      deletaRegistro(firebase.auth().currentUser.uid, item)
    );
  };

  const deletaRegistro = async (uid, idAlerta) => {
    try {
      //console.log(uid);
      await db
        .collection('usuários')
        .doc(uid)
        .collection('alertas')
        .doc(idAlerta)
        .delete();
      listaAlertas();
      setCheckados([]);
      // console.log('ok');
    } catch (error) {
      console.log(error);
    }
  };

  const setArquivado = async (uid, idAlerta) => {
    try {
      console.log(uid);
      await db
        .collection('usuários')
        .doc(uid)
        .collection('alertas')
        .doc(idAlerta)
        .update({ arquivado: true });
      listaAlertas();
      setCheckados([]);
      console.log('ok');
    } catch (error) {
      console.log(error);
    }
  };

  const listaAlertas = () => {
    console.log('00');
    db.collection('usuários')
      .doc(firebase.auth().currentUser.uid)
      .collection('alertas')
      .get()
      .then(querySnapshot => {
        setAlertas(querySnapshot.docs);
        const data = querySnapshot.docs.map(doc => doc.data());
        //console.log(data);
      });
  };

  useEffect(() => {
    listaAlertas();
  }, []);

  return (
    <div>
      {/* <BarraUm texto={`Bem vindo Usuário. Seu token é: ${firebase.auth().currentUser}`}></BarraUm> */}
      <BarraUm
        texto={`Bem vindo ${firebase.auth().currentUser.email}`}
      ></BarraUm>
      <BarraDois></BarraDois>
      <BarraSimples handleArquivar={handleArquivar} handleDeletar={handleDeletar} ></BarraSimples>      
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
