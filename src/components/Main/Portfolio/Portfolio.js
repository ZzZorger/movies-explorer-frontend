import aboutMeArrow from '../../../images/aboutMeArrow.svg';

export default function AboutMe() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <div className="portfolio__projects">
        <div className="portfolio__unit">
          <p className="portfolio__subtitle">Статичный сайт</p>
          <a className="portfolio__link transition" href="https://zzzorger.github.io/how-to-learn/" target="_blank" rel="noreferrer"><img className="portfolio__link-image" src={aboutMeArrow} alt="стрелка" /></a>
        </div>
        <div className="portfolio__unit">
          <p className="portfolio__subtitle">Адаптивный сайт</p>
          <a className="portfolio__link transition" href="https://zzzorger.github.io/russian-travel/" target="_blank" rel="noreferrer"><img className="portfolio__link-image" src={aboutMeArrow} alt="стрелка" /></a>
        </div>
        <div className="portfolio__unit">
          <p className="portfolio__subtitle">Одностраничное приложение</p>
          <a className="portfolio__link transition" href="https://myfirstdomainand.nomoredomains.icu/" target="_blank" rel="noreferrer"><img className="portfolio__link-image" src={aboutMeArrow} alt="стрелка" /></a>
        </div>
      </div>
    </div>
  )
}