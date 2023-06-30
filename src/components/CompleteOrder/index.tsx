import React from 'react';
import complete from './complete.png';
import Btn from '../../UI/Btn';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { closeCart } from '../../redux/slices/cart';

interface ICompleteOrderProps {
  setOrderComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompleteOrder: React.FC<ICompleteOrderProps> = ({ setOrderComplete }) => {
  const dispatch: AppDispatch = useDispatch();

  const onCloseCart = () => {
    dispatch(closeCart());
  };

  const onCompleteBack = () => {
    onCloseCart();
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
