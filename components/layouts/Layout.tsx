import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar } from '../ui/Navbar'

export const Layout:FC = ({children}) => {
    return (

        <>
            <Head>
                <title>URL Shortener</title>
                <meta name='author' content='Arnoldo Ortíz' />
                <meta name="description" content="URL shortener" />
                <meta name="keywords" content="url, shortener" />
                <link rel="shortcut icon" href="https://www.gypsd.ca/uploads/helpfullinks_banner.png" type="image/x-icon" />
            </Head>

            <Navbar />

            <main style={{
                padding: '20px 20px'
            }}>
                {children}
            </main>
        </>

    )
}
