import React from "react";
import BarraDois from "../components/BarraDois";
import BarraUm from "../components/BarraUm";
import BarraSimples from "../components/BarraSimples";
import Eventos from "../components/Eventos";


// import { Container } from './styles';

const eventos = [
  {
    id: 1,
    level: "error",
    descricao: "descricao do erro",
    origem: "origem do erro",
    dataHora: "01/01/2020 11:10:55",
    codigo: 1000
  },
  {
    id: 2,
    level: "warning",
    descricao: "só um aviso",
    origem: "react",
    dataHora: "01/01/2020 11:10:55",
    codigo: 200
  },
  {
    id: 3,
    level: "debug",
    descricao: "not found",
    origem: "classe 2",
    dataHora: "01/01/2020 11:10:55",
    codigo: 30
  }
];

export default function ErroLista() {
  return (
    <div>
      <BarraUm texto="Bem vindo Usuário. Seu token é: 321wwjsjsjsjsjsjsjs"></BarraUm>
      <BarraDois></BarraDois>
      <BarraSimples></BarraSimples>

      {eventos.map((e, index) => {
        return <Eventos key={index} evento={e}></Eventos>;
      })}
    </div>
  );
}
