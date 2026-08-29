import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  return (
    <Layout title="CCG Toolkit" description="CandyCandleGames Unity toolkit documentation">
      <main>
        <header className="hero hero--primary toolkit-hero">
          <div className="container">
            <p className="toolkit-hero__eyebrow">CANDYCANDLEGAMES · UNITY TOOLKIT</p>
            <h1 className="hero__title">CCG Toolkit</h1>
            <p className="hero__subtitle">
              A shared foundation for small Unity projects: application bootstrapping,
              services, object lifecycles, scenes, and developer tools.
            </p>
            <div className="toolkit-hero__actions">
              <Link className="button button--secondary button--lg" to="/get-started">
                Get started
              </Link>
              <Link className="button button--outline button--secondary button--lg" to="/architecture">
                Architecture
              </Link>
            </div>
          </div>
        </header>

        <section className="container margin-vert--xl" aria-labelledby="toolkit-navigation">
          <div className="toolkit-section-heading">
            <h2 id="toolkit-navigation">Documentation</h2>
            <p>Choose the path that best fits how you want to explore the toolkit.</p>
          </div>
          <div className="row toolkit-link-grid">
            <div className="col col--6 margin-bottom--lg">
              <Link className="toolkit-link-card" to="/get-started">
                <h3>Get started</h3>
                <p>Open the project, set up a scene, and run your first bootstrap.</p>
              </Link>
            </div>
            <div className="col col--6 margin-bottom--lg">
              <Link className="toolkit-link-card" to="/architecture">
                <h3>Architecture</h3>
                <p>Learn about DI, ticks, lifecycles, and scene management.</p>
              </Link>
            </div>
            <div className="col col--6">
              <Link className="toolkit-link-card" to="/examples">
                <h3>Examples</h3>
                <p>Explore SampleScene and apply the components in your own scene.</p>
              </Link>
            </div>
            <div className="col col--6">
              <Link className="toolkit-link-card" to="/api-reference">
                <h3>API Reference</h3>
                <p>Open the complete technical reference for the public API types.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="toolkit-version-notice" aria-labelledby="unity-version">
          <div className="container">
            <h2 id="unity-version">Target Unity version</h2>
            <p>
              CCG Toolkit targets <strong>Unity 6000.5.1f1</strong>. Open the
              project with this editor version in Unity Hub to avoid package and
              project-setting differences.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
