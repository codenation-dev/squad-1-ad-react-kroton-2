import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";

export default function Eventos(evento2, index) {
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheck = event => {
    setChecked(event.target.checked);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: "15px"
      }}
    >
      {console.log(evento2.evento)}
      {console.log(evento2.evento.level)}

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        width={1}
        borderBottom={1}
      >
        <Box ml={3}>
          <Checkbox
            checked={checked}
            onChange={handleChangeCheck}
            value="primary"
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
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
            <Box>{evento2.evento.dataHora}</Box>
          </Box>

          <Box mr={10}>{evento2.evento.codigo}</Box>
        </Box>
      </Box>
    </div>
  );
}
