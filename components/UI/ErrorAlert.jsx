import classes from './ErrorAlert.module.css';

export const ErrorAlert = props => {
  return <div className={classes.alert}>{props.children}</div>;
};
