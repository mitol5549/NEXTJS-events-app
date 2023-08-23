import { MainHeader } from './MainHeader';

export const Layout = props => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
};
