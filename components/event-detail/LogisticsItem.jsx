export const LogisticsItem = props => {
  const { icon: Icon } = props;

  return (
    <li className="flex flex-col items-center text-center text-2xl md:items-start md:text-left">
      <span className="block">
        <Icon width={30} height={30} />
      </span>
      <span className="block">{props.children}</span>
    </li>
  );
};
