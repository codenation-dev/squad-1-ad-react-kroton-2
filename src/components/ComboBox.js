import React from 'react';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginRight: 3
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
    width: '15ch'
  },
  componentWidth: {
    flexGrow: 0,
    margin: 5
  },
  fontLabel: {
    fontSize: '13px',
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  },
  fontMenuItem: {
    textTransform: 'uppercase'
  }
}));

const theme = createMuiTheme({
  overrides: {
    MuiMenu: {
      paper: {
        borderTop: '2px solid #1976d3'
      }
    },
    MuiInput: {
      root: {
        fontSize: '13px',
        fontWeight: 500,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      }
    }
  }
});

export default function SimpleSelect(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div className={classes.componentWidth}>
      <ThemeProvider theme={theme}>
        <FormControl className={classes.formControl}>
          <InputLabel
            className={`${classes.selectEmpty} ${classes.fontLabel}`}
            ref={inputLabel}
            id="demo-simple-select-outlined-label"
          >
            {props.label}
          </InputLabel>
          <Select
            className={classes.selectEmpty}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={props.value}
            onChange={props.handleChange}
            labelWidth={labelWidth}
            size="small"
          >
            <MenuItem
              value=""
              className={`${classes.fontLabel} ${classes.fontMenuItem}`}
            >
              <b>{props.label}</b>
            </MenuItem>
            {props.options.map((option, index) => {
              return (
                <MenuItem
                  key={index}
                  value={option.field}
                  className={classes.fontLabel}
                >
                  {option.descricao}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
