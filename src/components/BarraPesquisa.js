import React from 'react';
import ComboBox from '../components/ComboBox';
import Pesquisa from '../components/Pesquisa';
import { makeStyles, IconButton, Tooltip } from '@material-ui/core/';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ebebeb',
    padding: '0 10px',
    borderRadius: '4px',
    marginTop: '10px',
    border: '1px solid #ddd'
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
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Pesquisa
          onSearch={props.handleSearch}
          toClean={toClean}
          setToClean={setToClean}
        ></Pesquisa>
        <Tooltip title="Limpar Filtros" aria-label="Limpar filtros">
          <IconButton
            variant="outlined"
            color="secondary"
            className={classes.clearButton}
            onClick={handleClearFilters}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
