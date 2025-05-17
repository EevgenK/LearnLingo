import BenefitsList from '../../components/BenefitsList/BenefitsList';
import CustomSvg from '../../components/CustomSvg/CustomSvg';
import HeroStart from '../../components/HeroStart/HeroStart';
import Container from '../../components/shared/Container/Container';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <section>
      <Container additionalClass={s.hero}>
        <HeroStart />
        <CustomSvg />
        <BenefitsList />
      </Container>
    </section>
  );
};

export default HomePage;
