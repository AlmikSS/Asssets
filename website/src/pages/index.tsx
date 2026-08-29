import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="CCG Toolkit"
      description="Документация Unity-инструментария CandyCandleGames"
    >
      <main>
        <header className="hero hero--primary toolkit-hero">
          <div className="container">
            <p className="toolkit-hero__eyebrow">CANDYCANDLEGAMES · UNITY TOOLKIT</p>
            <h1 className="hero__title">CCG Toolkit</h1>
            <p className="hero__subtitle">
              Общая основа для небольших Unity-проектов: загрузка приложения,
              сервисы, жизненный цикл объектов, сцены и инструменты разработчика.
            </p>
            <div className="toolkit-hero__actions">
              <Link className="button button--secondary button--lg" to="/get-started">
                Начать работу
              </Link>
              <Link className="button button--outline button--secondary button--lg" to="/architecture">
                Архитектура
              </Link>
            </div>
          </div>
        </header>

        <section className="container margin-vert--xl" aria-labelledby="toolkit-navigation">
          <div className="toolkit-section-heading">
            <h2 id="toolkit-navigation">Документация</h2>
            <p>Выберите путь, с которого хотите начать знакомство с инструментарием.</p>
          </div>
          <div className="row toolkit-link-grid">
            <div className="col col--6 margin-bottom--lg">
              <Link className="toolkit-link-card" to="/get-started">
                <h3>Начать работу</h3>
                <p>Откройте проект, настройте сцену и запустите первый bootstrap.</p>
              </Link>
            </div>
            <div className="col col--6 margin-bottom--lg">
              <Link className="toolkit-link-card" to="/architecture">
                <h3>Архитектура</h3>
                <p>Познакомьтесь с DI, тиками, жизненным циклом и сценами.</p>
              </Link>
            </div>
            <div className="col col--6">
              <Link className="toolkit-link-card" to="/examples">
                <h3>Примеры</h3>
                <p>Разберите SampleScene и примените компоненты в своей сцене.</p>
              </Link>
            </div>
            <div className="col col--6">
              <Link className="toolkit-link-card" to="/api-reference">
                <h3>API Reference</h3>
                <p>Откройте полную техническую справку по публичным типам API.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="toolkit-version-notice" aria-labelledby="unity-version">
          <div className="container">
            <h2 id="unity-version">Целевая версия Unity</h2>
            <p>
              CCG Toolkit предназначен для <strong>Unity 6000.5.1f1</strong>.
              Открывайте проект в этой версии редактора через Unity Hub, чтобы
              избежать различий в пакетах и настройках проекта.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
