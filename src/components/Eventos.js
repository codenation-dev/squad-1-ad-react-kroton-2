import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

export default function Eventos(evento2, index) {
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheck = event => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      evento2.setCheckados(x => x.concat(evento2.id));
    } else {
      evento2.setCheckados(evento2.checkados.filter(x => x !== evento2.id));
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
    <div
      style={
        evento2.evento.arquivado ? estilos.estilodivCinza : estilos.estiloDiv
      }
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        width={1}
        borderBottom={1}
      >
        <Box ml={3}>
          <Checkbox
            disabled={evento2.evento.arquivado}
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
            {evento2.evento.level}
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <Box>{evento2.evento.descricao}</Box>
            <Box>{evento2.evento.origem}</Box>
            <Box>{timeConverter(evento2.evento.criadoEm.seconds)}</Box>
          </Box>

          <Box mr={10}>{evento2.evento.eventos}</Box>
        </Box>
      </Box>
    </div>
  );
}
