import React from 'react';
import ComboBox from '../components/ComboBox';
import Pesquisa from '../components/Pesquisa';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

import * as firebase from 'firebase/app';
import { db } from '../firebase/config';

// import { Container } from './styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    flexWrap: 'wrap'
  }
}));

export default function ErroLista(props) {
  const classes = useStyles();
  const { setAlertas } = props;

  const [tipo, setTipo] = React.useState('');
  const [ordem, setOrdem] = React.useState('');
  const [busca, setBusca] = React.useState('');
  const [order, setOrder] = React.useState('');
  const [type, setType] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [valueSearch, setValueSearch] = React.useState('');
  const [toClean, setToClean] = React.useState(false);

  const filterPanel = function(type, order, search, valueSearch) {
    let query = db
      .collection('usuários')
      .doc(firebase.auth().currentUser.uid)
      .collection('alertas');

    if (type) query = query.where('ambiente', '==', type);

    if (search) query = query.where(search, '==', valueSearch);

    if (order) query = query.orderBy(order, 'asc');

    query.get().then(querySnapshot => {
      setAlertas(querySnapshot.docs);
    });
  };

  const handleChangeTipo = event => {
    const { value } = event.target;
    setTipo(value);

    const result = tipos.filter(tipo => tipo.codigo === value);

    if (!result.length) {
      setType('');
      filterPanel('', order, search, valueSearch);
      return;
    }

    const ambiente = result[0].descricao;

    setType(ambiente);

    filterPanel(ambiente, order, search, valueSearch);
  };

  const handleChangeOrdem = event => {
    const { value } = event.target;
    setOrdem(value);

    const result = ordens.filter(ordem => ordem.codigo === value);

    if (!result.length) {
      setOrder('');
      filterPanel(type, '', search, valueSearch);
      return;
    }

    const fieldOrder = result[0].field;

    setOrder(fieldOrder);

    filterPanel(type, fieldOrder, search, valueSearch);
  };

  const handleChangeBusca = event => {
    const { value } = event.target;

    if (!value) {
      setToClean(true);
      filterPanel(type, order, '', '');
    } else {
      setToClean(false);
    }

    setBusca(value);
  };

  const handleSearch = (value, event) => {
    event.preventDefault();

    const result = buscas.filter(search => search.codigo === busca);

    if (!result.length || !value) {
      setSearch('');
      setValueSearch('');
      filterPanel(type, order, '', '');
      return;
    }
    value = String(value).toLowerCase();
    const fieldSearch = result[0].field;

    setSearch(fieldSearch);
    setValueSearch(value);

    filterPanel(type, order, fieldSearch, value);
  };

  const tipos = [
    { descricao: 'Produção', codigo: 1 },
    { descricao: 'Homologação', codigo: 2 },
    { descricao: 'Dev', codigo: 3 }
  ];

  const ordens = [
    { field: 'level', descricao: 'Level', codigo: 1 },
    { field: 'frequencia', descricao: 'Frequência', codigo: 2 }
  ];

  const buscas = [
    { field: 'level', descricao: 'Level', codigo: 1 },
    { field: 'descricao', descricao: 'Descrição', codigo: 2 },
    { field: 'origem', descricao: 'Origem', codigo: 3 }
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <ComboBox
            handleChange={handleChangeTipo}
            value={tipo}
            label="Tipo"
            options={tipos}
          />
          <ComboBox
            handleChange={handleChangeOrdem}
            value={ordem}
            label="Ordenar por"
            options={ordens}
          />
          <ComboBox
            handleChange={handleChangeBusca}
            value={busca}
            label="Buscar por"
            options={buscas}
          />
          <Pesquisa onSearch={handleSearch} toClean={toClean}></Pesquisa>
        </Toolbar>
      </AppBar>
    </div>
  );
}
