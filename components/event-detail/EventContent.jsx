import classes from './EventContent.module.css';

export const EventContent = props => {
  return <section className={classes.content}>{props.children}</section>;
};
