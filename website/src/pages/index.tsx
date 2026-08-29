import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  return (
    <Layout title="CCG Toolkit" description="Документация Unity-инструментария CandyCandleGames">
      <main className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">CCG Toolkit</h1>
          <p className="hero__subtitle">
            Общая основа для небольших Unity-проектов CandyCandleGames.
          </p>
          <div className="margin-top--lg">
            <Link className="button button--secondary button--lg" to="/get-started">
              Начать работу
            </Link>
          </div>
        </div>
      </main>
      <main className="container margin-vert--xl">
        <section>
          <h2>Создавайте проекты на единой основе</h2>
          <p>
            Изучите загрузку приложения, внедрение зависимостей, жизненный цикл,
            тики, события, сцены и инструменты разработчика.
          </p>
          <p>
            Публичная техническая справка API доступна на английском языке для
            обеих локалей.
          </p>
          <Link className="button button--primary button--lg" to="/architecture">
            Изучить архитектуру
          </Link>
        </section>
      </main>
    </Layout>
  );
}
