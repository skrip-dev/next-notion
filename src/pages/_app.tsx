import React from 'react';

import '~/config/firebaseClient';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-coy.css';
import 'rc-dropdown/assets/index.css';
import 'katex/dist/katex.min.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { theme } from '~/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>skrip.dev</title>
      </Head>

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
