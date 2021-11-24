import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Weather App</title>
                <meta name="description" content="Weather App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title + ' mb-5'}>
                    Weather App
                </h1>
                {children}
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://github.com/tejp98"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made by Tej
                </a>
            </footer>
        </div>
    )
}
