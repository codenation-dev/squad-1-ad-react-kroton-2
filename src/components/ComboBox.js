import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
    width: 150
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          className={classes.selectEmpty}
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
        >
          <MenuItem value="">
            <em>{props.label}</em>
          </MenuItem>
          {props.options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.codigo}>
                {option.descricao}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
