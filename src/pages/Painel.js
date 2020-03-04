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
  const [alertas, setAlertas] = useState([])

  // useEffect(() => {
  //   db.collection("usuários")
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then((querySnapshot) => {
  //       console.log(querySnapshot)
  //     });
  // }, [])


  useEffect(() => {
    db.collection("usuários")
      .doc(firebase.auth().currentUser.uid)
      .collection("alertas")
      .get()
      .then((querySnapshot) => {
        setAlertas(querySnapshot.docs)
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
      });
  }, [])

  return (
    <div>
      {/* <BarraUm texto={`Bem vindo Usuário. Seu token é: ${firebase.auth().currentUser}`}></BarraUm> */}
      <BarraUm texto={`Bem vindo ${firebase.auth().currentUser.email}`}></BarraUm>
      <BarraDois></BarraDois>
      <BarraSimples></BarraSimples>

      {alertas.map((e, index) => {
        return <Eventos key={index} evento={e.data()}></Eventos>;
      })}
    </div>
  );
}
