import Link from 'next/link';

import classes from './Button.module.css';

export const Button = props => {
  return (
    <Link href={props.link} className={classes.btn}>
      {props.children}
    </Link>
  );
};
