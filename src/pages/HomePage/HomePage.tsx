import BenefitsList from '../../components/BenefitsList/BenefitsList';
import CustomSvg from '../../components/CustomSvg/CustomSvg';
import HeroStart from '../../components/HeroStart/HeroStart';

import s from './HomePage.module.css';
const HomePage = () => {
  return (
    <section className={s.hero}>
      <HeroStart />
      <CustomSvg />
      <BenefitsList />
    </section>
  );
};

export default HomePage;
