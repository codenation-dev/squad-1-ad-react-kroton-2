import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 3),
    width: '300px'
  }
}));

export default function BarraSimples(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheck = event => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <CssBaseline />

      <AppBar position="relative" color="default" elevation={1}>
        <Toolbar>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <div style={{ marginBottom: '20px' }}>
              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                onClick={props.handleArquivar}
                //onClick={}
              >
                Arquivar
              </Button>
              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                onClick={props.handleDeletar}
              >
                Apagar
              </Button>
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
            >
              <div>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheck}
                  value="primary"
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1
                }}
              >
                <Box ml={5}>
                  <Typography>Level</Typography>
                </Box>
                <Typography>log</Typography>
                <Box mr={5}>
                  <Typography>Eventos</Typography>
                </Box>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
