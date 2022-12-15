import aboutMePhoto from '../../../images/aboutMePhoto.svg';

export default function AboutMe() {
  return(
    <section className="about-me">
      <h2 className="title">Студент</h2>
      <div className="bio">
        <div className="bio__main">
          <h3 className="bio__title">Виталий</h3>
          <p className="bio__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="bio__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. 
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». 
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="bio__link" href="https://github.com/ZzZorger" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img 
          className="bio__photo" 
          alt="фото студента" 
          src={aboutMePhoto}
        />
      </div>
    </section>
  )
}