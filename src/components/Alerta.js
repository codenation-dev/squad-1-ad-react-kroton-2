import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

export default function Alerta({ alerta, id, checkados, setCheckados }, index) {
  const useStyles = makeStyles({
    log: {
      display: 'flex',
      flexDirection: 'column'
    },
    tableRow: {
      backgroundColor: alerta.arquivado ? '#f9f9f9' : '#fff',
      fontStyle: alerta.arquivado ? 'italic' : 'normal',
      textDecoration: alerta.arquivado ? 'line-through' : 'normal'
    },
    alert: {
      width: '120px',
      fontSize: '10px',
      padding: '5px 10px'
    }
  });
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheck = event => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      setCheckados(x => x.concat(id));
    } else {
      setCheckados(checkados.filter(x => x !== id));
    }
  };

  useEffect(() => setChecked(checkados.some(checkId => checkId === id)), [
    checkados,
    id
  ]);

  return (
    <TableRow className={classes.tableRow}>
      <TableCell align="center" padding="checkbox">
        <Checkbox
          checked={checked}
          onChange={handleChangeCheck}
          value="primary"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </TableCell>

      <TableCell
        align="center"
        className={classes.level}
        style={{ width: '10%' }}
      >
        <Alert
          severity={alerta.level === 'debug' ? 'info' : alerta.level}
          className={classes.alert}
        >
          {alerta.level.toUpperCase()}
        </Alert>
      </TableCell>

      <TableCell className={classes.log} align="center">
        <Link to={`/alert/${id}`}>{alerta.descricao}</Link>
        <span>{alerta.origem}</span>
        <span>
          <Moment unix format="DD/MM/YYYY HH:mm">
            {alerta.criadoEm.seconds}
          </Moment>
        </span>
      </TableCell>

      <TableCell align="center">{alerta.eventos}</TableCell>
    </TableRow>
  );
}
