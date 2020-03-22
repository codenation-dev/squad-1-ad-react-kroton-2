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
    minWidth: '25ch',
    flexGrow: 1,
    margin: 4.5
  },
  iconButton: {
    padding: 10
  },
  fontLabel: {
    fontSize: '13px',
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
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
      <InputLabel htmlFor="pesquisa" className={classes.fontLabel}>
        Pesquisa
      </InputLabel>
      <Input
        id="pesquisa"
        className={classes.fontLabel}
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
