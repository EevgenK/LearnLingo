import { statistics } from '../../assets/statistic';
import s from './BenefitsList.module.css';

const BenefitsList = () => {
  return (
    <ul className={s.benefits}>
      {statistics.map((el, idx) => (
        <li key={idx}>
          {el.value.toLocaleString('en-US')} + <span>{el.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default BenefitsList;
