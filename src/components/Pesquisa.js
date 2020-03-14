import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 50
  },
  input: {
    marginLeft: theme.spacing(1),
    marginTop: 10,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

export default function Pesquisa(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const { toClean } = props;

  React.useEffect(() => {
    if (toClean) {
      setValue('');
    }
  }, [toClean]);

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        fullWidth
        variant="outlined"
        className={classes.input}
        placeholder="Pesquisa"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={event => setValue(event.target.value)}
        value={value}
      />
      <IconButton
        onClick={e => props.onSearch(value, e)}
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
