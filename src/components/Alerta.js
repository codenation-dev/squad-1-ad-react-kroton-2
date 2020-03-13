import React from 'react';
import Moment from 'react-moment';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  log: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default function Alerta({ alerta, id, checkados, setCheckados }, index) {
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
    <TableRow>
      <TableCell align="center">
        <Checkbox
          checked={checked}
          onChange={handleChangeCheck}
          value="primary"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </TableCell>

      <TableCell align="center">{alerta.level}</TableCell>

      <TableCell className={classes.log} align="center">
        <span>{alerta.descricao}</span>
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
