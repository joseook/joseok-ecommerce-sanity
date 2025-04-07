import React, { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

/**
 * @param {Object} props
 * @param {import('next/app').AppProps["Component"]} props.Component
 * @param {import('next/app').AppProps["pageProps"]} props.pageProps
 */
function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </StrictMode>
  );
}

export default MyApp;
