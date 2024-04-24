import Head from 'next/head'
import TaskBoard from "../components/TaskBoard";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Tasks</title>
            </Head>
            <main>
                <h1>Tasks</h1>
                <TaskBoard />
            </main>
        </div>
    )
}
