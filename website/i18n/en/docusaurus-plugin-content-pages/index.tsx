import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  return (
    <Layout title="CCG Toolkit" description="CandyCandleGames Unity toolkit documentation">
      <main className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">CCG Toolkit</h1>
          <p className="hero__subtitle">
            The shared foundation for small CandyCandleGames Unity projects.
          </p>
          <div className="margin-top--lg">
            <Link className="button button--secondary button--lg" to="/get-started">
              Get started
            </Link>
          </div>
        </div>
      </main>
      <main className="container margin-vert--xl">
        <section>
          <h2>Build projects on a shared foundation</h2>
          <p>
            Learn about application bootstrapping, dependency injection, lifecycle,
            ticks, events, scenes, and developer tools.
          </p>
          <p>
            The public technical API reference is available in English for both
            locales.
          </p>
          <Link className="button button--primary button--lg" to="/architecture">
            Explore the architecture
          </Link>
        </section>
      </main>
    </Layout>
  );
}
