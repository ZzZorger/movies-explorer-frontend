import Promo from './Promo/Promo.js';
import NavTab from './NavTab/NavTab.js';
import AboutProject from './AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
// import Portfolio from './Portfolio/Portfolio.js';

export default function Main() {
  return (
    <main className='mainPage'>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      {/* <Portfolio /> */}
    </main>
  );
}
