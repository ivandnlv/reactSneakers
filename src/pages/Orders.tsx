import { useEffect } from 'react';
import EmptyOrders from '../components/EmptyOrders';
import SneakersItem from '../components/SneakersItem';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/sneakers';
import { priceMoreThan10 } from '../components/App';

const Orders = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('orders'));
  }, [dispatch]);

  const { ordersSneakers } = useTypedSelector((state) => state.orders);

  const howMuchMoneySpent = () => {
    let money = 0;
    ordersSneakers?.forEach((orderSneaker) => {
      money += orderSneaker.count * orderSneaker.price;
    });
    return money;
  };

  return (
    <div className="sneakers">
      {ordersSneakers && ordersSneakers.length !== 0 ? (
        <>
          <h1>Мои покупки</h1>
          <div className="sneakers__orders-list">
            {ordersSneakers.map((item) => (
              <SneakersItem key={item.id} sneaker={item} type="orders" />
            ))}
          </div>
          <h2 className="sneakers__orders-total">
            Всего было потрачено: {priceMoreThan10(howMuchMoneySpent())} руб.
          </h2>
        </>
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
};

export default Orders;
