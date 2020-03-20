import React, { useState } from 'react';
import { Button, TextField, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase/app';
import { db } from '../firebase/config';
import ComboBox from '../components/ComboBox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
  paper: {
    width: 380,
    padding: 40,
    [theme.breakpoints.down('sm')]: {
      width: 345
    }
  },
  title: {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  },
  buttonMargin: {
    marginTop: 30
  },
  textMargin: {
    marginBottom: 20
  },
  alert: {
    color: '#de1414'
  },
  returnLogin: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30
  }
}));

export default function CadastraAlerta() {
  const classes = useStyles();

  const [titulo, setTitulo] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ambiente, setAmbiente] = useState('Homologação');
  const [origem, setOrigem] = useState('');
  const [coletadoPor, setColetadoPor] = useState('');
  const [eventos, setEventos] = useState('');
  const [level, setLevel] = useState('warning');

  const levels = [
    { descricao: 'warning', codigo: 'warning' },
    { descricao: 'debug', codigo: 'debug' },
    { descricao: 'error', codigo: 'error' }
  ];

  const ambientes = [
    { descricao: 'Produção', codigo: 'Produção' },
    { descricao: 'Homologação', codigo: 'Homologação' },
    { descricao: 'Dev', codigo: 'Dev' }
  ];

  const handleChangeAmbiente = event => {
    setAmbiente(event.target.value);
  };

  const handleChangeLevel = event => {
    setLevel(event.target.value);
  };

  const handleCadastrar = () => {
    db.collection('usuários')
      .doc(firebase.auth().currentUser.uid)
      .collection('alertas')
      .add({
        titulo: titulo,
        detalhes: detalhes,
        descricao: descricao,
        ambiente: ambiente,
        origem: origem,
        coletadoPor: coletadoPor,
        eventos: eventos,
        level: level,
        criadoEm: '2020-03-20T13:02:06.831Z',
        arquivado: false
      })
      .then(console.log('Cadastrou'))
      .catch(console.error('Deu erro'));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2}>
        <Typography className={classes.title} component="h1" variant="h5">
          Cadastra Alerta
        </Typography>

        <div className={classes.textMargin}>
          <TextField
            id="titulo"
            type="text"
            label="Título"
            value={titulo}
            onChange={event => setTitulo(event.target.value)}
            fullWidth
            required
          />
        </div>

        <div className={classes.textMargin}>
          <TextField
            id="detalhes"
            type="text"
            label="Detalhes"
            value={detalhes}
            onChange={event => setDetalhes(event.target.value)}
            fullWidth
            required
          />
        </div>

        <div className={classes.textMargin}>
          <TextField
            id="descricao"
            type="text"
            label="Descrição"
            value={descricao}
            onChange={event => setDescricao(event.target.value)}
            fullWidth
            required
          />
        </div>

        <div className={classes.textMargin}>
          <ComboBox
            handleChange={handleChangeAmbiente}
            value={ambiente}
            label="Ambiente"
            options={ambientes}
          />
        </div>

        <div className={classes.textMargin}>
          <TextField
            id="origem"
            type="text"
            label="Origem"
            value={origem}
            onChange={event => setOrigem(event.target.value)}
            fullWidth
            required
          />
        </div>

        <div className={classes.textMargin}>
          <TextField
            id="coletadoPor"
            type="text"
            label="Coletado por"
            value={coletadoPor}
            onChange={event => setColetadoPor(event.target.value)}
            fullWidth
            required
          />
        </div>

        <div className={classes.textMargin}>
          <TextField
            id="eventos"
            type="text"
            label="Eventos"
            value={eventos}
            onChange={event => setEventos(event.target.value)}
            fullWidth
            required
          />
        </div>

        <div className={classes.textMargin}>
          <ComboBox
            handleChange={handleChangeLevel}
            value={level}
            label="Level"
            options={levels}
          />
        </div>

        {/* <div className={classes.textMargin}>
          <TextField
            id="criadoEm"
            type="text"
            label="Criado em"
            value={criadoEm}
            onChange={event => setCriadoEm(event.target.value)}
            fullWidth
            required
          />
        </div> */}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disableElevation
          onClick={handleCadastrar}
        >
          Cadastrar
        </Button>
      </Paper>
    </div>
  );
}
