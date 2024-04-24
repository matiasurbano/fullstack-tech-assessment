import Head from 'next/head';
import ProjectBoard from "../components/ProjectBoard";

export default function Projects() {
    return (
      <div>
        <Head>
          <title>Projects</title>
        </Head>
        <main>
          <h1>Projects</h1>
          <ProjectBoard />
        </main>
      </div>
    );
}
