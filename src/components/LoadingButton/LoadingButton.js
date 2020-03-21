import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: 3,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonMargin: {
    marginTop: 30
  }
}));

export default function LoadingButton({
  children,
  onClick,
  type,
  isLoading = false
}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.buttonMargin}
        type={type}
        variant="contained"
        color="primary"
        fullWidth
        disableElevation
        disabled={isLoading}
        onClick={onClick}
      >
        {children}
      </Button>
      {isLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}
