import aboutMePhoto from '../../../images/aboutMePhoto.svg';

export default function AboutMe() {
  return(
    <section className="about-me">
      <h2 className="title">Студент</h2>
      <div className="about-me__bio">
        <div className="about-me__main">
          <div className="about-me__text-part">
            <h3 className="about-me__title">Виталий</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. 
              У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
              С 2015 года работал в компании «СКБ Контур». 
              После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>
          <a className="about-me__link transition" href="https://github.com/ZzZorger" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img 
          className="about-me__photo" 
          alt="фото студента" 
          src={aboutMePhoto}
        />
      </div>
    </section>
  )
}