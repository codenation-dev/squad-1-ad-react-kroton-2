import React from 'react';
import {
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  InputAdornment
} from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
    <FormControl className={classes.root}>
      <InputLabel htmlFor="pesquisa">Pesquisa</InputLabel>
      <Input
        id="pesquisa"
        onChange={event => setValue(event.target.value)}
        value={value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={e => props.onSearch(value, e)}
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
