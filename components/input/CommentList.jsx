import classes from './comment-list.module.css';

export const CommentList = props => {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items.map(item => (
        <li key={item.id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};
