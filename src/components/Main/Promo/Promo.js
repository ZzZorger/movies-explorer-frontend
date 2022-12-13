import promoImage from '../../../images/promoImage.svg';

export default function Promo() {
  return(
    <section className="promo" name="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img 
        className="promo_image"
        src={promoImage}
        alt="логотип практикума" 
      />
    </section>
  )
}