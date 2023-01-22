import aboutMeArrow from '../../../images/aboutMeArrow.svg';

export default function AboutMe() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__projects">
        <li className="portfolio__list">
          <a className="portfolio__unit transition" href="https://zzzorger.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            <p className="portfolio__subtitle">Статичный сайт</p>
            <img className="portfolio__link-image" src={aboutMeArrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__list">
          <a className="portfolio__unit transition" href="https://zzzorger.github.io/russian-travel/" target="_blank" rel="noreferrer">
            <p className="portfolio__subtitle">Адаптивный сайт</p>
            <img className="portfolio__link-image" src={aboutMeArrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__list">
          <a className="portfolio__unit transition" href="https://myfirstdomainand.nomoredomains.icu/" target="_blank" rel="noreferrer">
            <p className="portfolio__subtitle">Одностраничное приложение</p>
            <img className="portfolio__link-image" src={aboutMeArrow} alt="стрелка" />
          </a>
        </li>
      </ul>
    </section>
  )
}