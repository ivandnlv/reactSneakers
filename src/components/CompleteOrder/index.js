import React, { useContext } from 'react';
import complete from './complete.png';
import Btn from '../../UI/Btn';
import AppContext from '../Context';

const CompleteOrder = ({ setOrderComplete }) => {
  const { closeCart } = useContext(AppContext);

  const onCompleteBack = () => {
    closeCart();
    setOrderComplete(false);
  };

  return (
    <div className="completeorder">
      <img src={complete} alt="complete" />
      <h2>Заказ оформлен!</h2>
      <p>Ваш заказ #18 скоро будет передан курьерской доставке</p>
      <Btn btnType="back" onClick={onCompleteBack}>
        Вернуться назад
      </Btn>
    </div>
  );
};

export default CompleteOrder;
