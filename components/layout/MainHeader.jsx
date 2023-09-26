import { useEffect, useState } from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';

import { useSession, signOut } from 'next-auth/react';

import { Sun, Moon } from '../icons/ThemeIcon';

export const MainHeader = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    signOut();
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent justify="left">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden" />
      </NavbarContent>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          NEXT EVENTS
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center" className="gap-12 hidden md:flex">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" isDisabled={session ? false : true}>
            Create Event
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/events" isDisabled={session ? false : true}>
            Browse All Events
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="gap-12 hidden sm:flex">
          {session && (
            <Button className="bg-primary-200" onClick={logoutHandler}>
              Logout
            </Button>
          )}
          {!session && !loading && (
            <Button as={Link} href="/auth" className="bg-primary-200">
              Login
            </Button>
          )}
        </NavbarItem>
        <NavbarItem className="justify-center">
          <Button
            color="foreground"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="flex"
          >
            {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="/" size="lg">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="#" size="lg" isDisabled={session ? false : true}>
            Create Event
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="/events" size="lg" isDisabled={session ? false : true}>
            Browse All Events
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="w-full flex">
          {session && (
            <Button color="foreground" className="mt-8 mx-auto bg-primary-200" size="lg">
              Logout
            </Button>
          )}
          {!session && (
            <Link color="foreground" className="w-full" href="/auth" size="lg">
              Login
            </Link>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
