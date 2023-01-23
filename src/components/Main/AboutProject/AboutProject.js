export default function AboutProject() {
  return(
    <section className="about" id="about">
      <h2 className="title">О проекте</h2>
      <div className="about__block-section">
        <div className="about__block">
          <h3 className="about__title">Дипломный проект включал 5 этапов</h3>
          <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__block">
          <h3 className="about__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__timeline">
        <div className="about__time">
          <p className="about__period">1 неделя</p>
          <p className="about__period">4 недели</p>
        </div>
        <div className="about__time">
          <p className="about__sign">Back-end</p>
          <p className="about__sign">Front-end</p>
        </div>
      </div>
    </section>
  )
}