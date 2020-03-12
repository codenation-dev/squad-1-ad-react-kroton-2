import React, { useEffect, useState } from 'react';
import BarraDois from '../components/BarraDois';
import BarraUm from '../components/BarraUm';
import BarraSimples from '../components/BarraSimples';
import Eventos from '../components/Eventos';
import * as firebase from 'firebase/app';
import { db } from '../firebase/config';

import { Link } from 'react-router-dom';

export default function ErroLista() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    db.collection('usuários')
      .doc(firebase.auth().currentUser.uid)
      .collection('alertas')
      .get()
      .then(querySnapshot => {
        setAlertas(querySnapshot.docs);
      });
  }, []);

  return (
    <div>
      <BarraUm
        texto={`Bem vindo ${firebase.auth().currentUser.email}`}
      ></BarraUm>
      <BarraDois></BarraDois>
      <BarraSimples></BarraSimples>

      {alertas.map((e, index) => {
        return <Eventos key={index} evento={e.data()}></Eventos>;
      })}
      {/* apenas para teste */}
      <Link to="/alert/example">Pág Alerta</Link>
    </div>
  );
}
