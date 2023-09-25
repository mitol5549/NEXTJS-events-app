export const LogisticsItem = props => {
  const { icon: Icon } = props;

  return (
    <li className="flex md:flex-col flex-row items-start text-start text-2xl md:items-start md:text-left">
      <span className="block mr-4">
        <Icon width={30} height={30}  />
      </span>
      <span className="flex">{props.children}</span>
    </li>
  );
};
