import Head from 'next/head';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { Layout } from '../components/layout/Layout';
import { NotificationContextProvider } from '../store/notification-context';

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider session={session}>
          <NotificationContextProvider>
            <Layout>
              <Head>
                <title>Next Events</title>
                <meta name="description" content="NextJS Events" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </NotificationContextProvider>
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;
