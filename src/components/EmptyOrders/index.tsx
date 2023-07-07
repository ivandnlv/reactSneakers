import { Link } from 'react-router-dom';
import Btn from '../../UI/Btn';
import random1 from './random1.jpg';
import random2 from './random2.jpg';
import random3 from './random3.jpg';
import random4 from './random4.jpg';

const EmptyOrders = () => {
  const randomImage = () => {
    const number = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    if (number === 1) {
      return random1;
    } else if (number === 2) {
      return random2;
    } else if (number === 3) {
      return random3;
    } else {
      return random4;
    }
  };

  return (
    <div className="emptyorders">
      <img src={randomImage()} alt=":(" />
      <h1>У вас нет заказов</h1>
      <p>
        Вы нищеброд?
        <br />
        Оформите хотя бы один заказ.
      </p>
      <Link to="/">
        <Btn btnType="back">Вернуться назад</Btn>
      </Link>
    </div>
  );
};

export default EmptyOrders;
