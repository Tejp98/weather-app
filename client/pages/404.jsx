import { useRouter } from 'next/router'
import Layout from '../layout/DefaultLayout'
import styles from '../styles/Home.module.css'

export default function IndexPage() {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <Layout>
                <p>
                    Ooops!! Looks like you're lost.
                </p>
                <button
                    className='btn btn-info'
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    Go Home!!
                </button>
            </Layout>
        </div>
    )
}
