import React from 'react';
import ComboBox from '../components/ComboBox';
import Pesquisa from '../components/Pesquisa';
import { makeStyles, Button, IconButton, Fab } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#e3e3e3',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  clearButton: {
    margin: 10
  }
}));

export default function BarraPesquisa(props) {
  const classes = useStyles();
  const [toClean, setToClean] = React.useState(false);

  const handleClearFilters = function() {
    props.setFilters({
      search: '',
      searchBy: '',
      orderBy: '',
      type: ''
    });
    setToClean(true);
    props.listaAlertas();
  };

  const tipos = [
    { field: 'Produção', descricao: 'Produção', codigo: 1 },
    { field: 'Homologação', descricao: 'Homologação', codigo: 2 },
    { field: 'Desenvolvimento', descricao: 'Desenvolvimento', codigo: 3 }
  ];

  const ordens = [
    { field: 'level', descricao: 'Level', codigo: 1 },
    { field: 'eventos', descricao: 'Frequência', codigo: 2 }
  ];

  const buscas = [
    { field: 'level', descricao: 'Level', codigo: 1 },
    { field: 'descricao', descricao: 'Descrição', codigo: 2 },
    { field: 'origem', descricao: 'Origem', codigo: 3 }
  ];

  return (
    <div className={classes.root}>
      <ComboBox
        handleChange={props.handleType}
        value={props.type}
        label="Tipo"
        options={tipos}
      />
      <ComboBox
        handleChange={props.handleOrderBy}
        value={props.orderBy}
        label="Ordenar por"
        options={ordens}
      />
      <ComboBox
        handleChange={props.handleSearchBy}
        value={props.searchBy}
        label="Buscar por"
        options={buscas}
      />
      <Pesquisa onSearch={props.handleSearch} toClean={toClean}></Pesquisa>

      <IconButton
        variant="outlined"
        color="secondary"
        className={classes.clearButton}
        onClick={handleClearFilters}
      >
        <HighlightOffIcon />
      </IconButton>
    </div>
  );
}
