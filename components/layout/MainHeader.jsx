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

import { Sun, Moon } from '../icons/ThemeIcon';

export const MainHeader = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
          <Link color="foreground" href="#">
            Create Event
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/events">
            Browse All Events
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="gap-12 hidden sm:flex">
          <Button as={Link} href="/auth" className="bg-primary-200">
            Login
          </Button>
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
          <Link color="foreground" className="w-full" href="#" size="lg">
            Create Event
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="/events" size="lg">
            Browse All Events
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" className="w-full" href="/auth" size="lg">
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
