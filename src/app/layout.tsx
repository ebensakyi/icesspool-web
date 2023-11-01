// 'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/src/components/Header'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextAuthProvider from './context/AuthProvider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'icesspool',
  description: 'icesspool',
}



export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (


    <html lang="en">

      <head>

        <link href="../../assets/img/favicon.png" rel="icon" />
        <link href="../../assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

        <link href="../../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="../../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="../../assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />

        <link href="../../assets/vendor/remixicon/remixicon.css" rel="stylesheet" />




        <link href="../../assets/css/style.css" rel="stylesheet"></link>

        <Script src="../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />

        <Script src="../../assets/vendor/tinymce/tinymce.min.js" />
        <Script src="../../assets/js/main.js" />

      </head>


      <body className={inter.className} >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <NextAuthProvider>
          <Header />

          {children}
        </NextAuthProvider>


        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

      </body>


    </html>
  )
}
