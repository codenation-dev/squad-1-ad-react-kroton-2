import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Moment from 'react-moment';

export default function Alerta({ alerta, id, checkados, setCheckados }, index) {
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheck = event => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      setCheckados(x => x.concat(id));
    } else {
      setCheckados(checkados.filter(x => x !== id));
    }
  };

  const estilos = {
    estiloDiv: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      marginTop: '15px'
    },
    estilodivCinza: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      marginTop: '15px',
      opacity: '0.2'
    }
  };

  return (
    <div style={alerta.arquivado ? estilos.estilodivCinza : estilos.estiloDiv}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        width={1}
        borderBottom={1}
      >
        <Box ml={3}>
          <Checkbox
            disabled={alerta.arquivado}
            checked={checked}
            onChange={handleChangeCheck}
            value="primary"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Box>

        <Box
          width={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box ml={5} bgcolor="text.secondary">
            {alerta.level}
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <Box>{alerta.descricao}</Box>
            <Box>{alerta.origem}</Box>
            <Box>
              <Moment unix format="DD/MM/YYYY HH:mm">
                {alerta.criadoEm.seconds}
              </Moment>
            </Box>
          </Box>

          <Box mr={10}>{alerta.eventos}</Box>
        </Box>
      </Box>
    </div>
  );
}
