export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Страница не найдена</h2>
      <a className="not-found__link transition" href="/movies">Назад</a>
    </section>
  );
}