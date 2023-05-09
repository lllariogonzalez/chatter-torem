import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { store } from '../redux/store';

function MyApp(appProps: AppProps) {
  const { Component, pageProps } = appProps;

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
    require('../App.css');
    require('../index.css');
  }, []);

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Chatter</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="rootDiv w-100 overflow-hidden h-100 d-flex flex-column align-content-center align-items-center justify-content-center">
          <Header />

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
          <Footer />
        </div>
      </Provider>
    </>
  );
}
export default MyApp;
