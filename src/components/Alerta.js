import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Alerta({ alerta, id, checkados, setCheckados }, index) {
  const useStyles = makeStyles({
    log: {
      display: 'flex',
      flexDirection: 'column'
    },
    tableRow: {
      backgroundColor: alerta.arquivado ? '#eee' : '#fff'
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

  return (
    <TableRow className={classes.tableRow}>
      <TableCell align="center">
        <Checkbox
          checked={checked}
          onChange={handleChangeCheck}
          value="primary"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </TableCell>

      <TableCell align="center" className={classes.level}>
        {alerta.level}
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
