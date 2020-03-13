import React from 'react';
import ComboBox from '../components/ComboBox';
import Pesquisa from '../components/Pesquisa';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

// import { Container } from './styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    toolbar: {
        flexWrap: 'wrap',
    },
}));

export default function BarraPesquisa() {
    const classes = useStyles();

    const [tipo, setTipo] = React.useState('');
    const [ordem, setOrdem] = React.useState('');
    const [busca, setBusca] = React.useState('');

    const handleChangeTipo = event => {
        setTipo(event.target.value);
    };

    const handleChangeOrdem = event => {
        setOrdem(event.target.value);
    };

    const handleChangeBusca = event => {
        setBusca(event.target.value);
    };

    const tipos = [
        { descricao: 'Produção', codigo: 1 },
        { descricao: 'Homologação', codigo: 2 },
        { descricao: 'Dev', codigo: 3 },
    ];

    const ordens = [
        { descricao: 'Level', codigo: 1 },
        { descricao: 'Frequência', codigo: 2 },
    ];

    const buscas = [
        { descricao: 'Level', codigo: 1 },
        { descricao: 'Descrição', codigo: 2 },
        { descricao: 'Origem', codigo: 3 },
    ];

    return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" color="default" >
                <Toolbar className={classes.toolbar}>
                    <ComboBox handleChange={handleChangeTipo} value={tipo} label="Tipo" options={tipos} />
                    <ComboBox handleChange={handleChangeOrdem} value={ordem} label="Ordenar por" options={ordens} />
                    <ComboBox handleChange={handleChangeBusca} value={busca} label="Buscar por" options={buscas} />
                    <Pesquisa></Pesquisa>
                </Toolbar>
            </AppBar>

        </div >


    );
}
