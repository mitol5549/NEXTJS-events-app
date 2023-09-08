import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';

export const MainHeader = () => {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          NEXT EVENTS
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/events" variant="flat">
            Browse All Events
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
