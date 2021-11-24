import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/DefaultLayout'
import InputComponent from '../components/InputComponent'
import styles from '../styles/Home.module.css'

export default function IndexPage() {
  return (
    <div className={styles.container}>
      <Layout>
        <InputComponent
        />
      </Layout>
    </div>
  )
}
