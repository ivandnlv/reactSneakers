import { useEffect } from 'react';
import EmptyOrders from '../components/EmptyOrders';
import SneakersItem from '../components/SneakersItem';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/sneakers';

const Orders = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('orders'));
  }, [dispatch]);

  const { ordersSneakers } = useTypedSelector((state) => state.orders);

  return (
    <div className="sneakers">
      {ordersSneakers && ordersSneakers.length !== 0 ? (
        <>
          <h1>Мои покупки</h1>
          <div className="sneakers__orders-list">
            {ordersSneakers.map((item) => (
              <SneakersItem key={item.id} sneaker={item} />
            ))}
          </div>
        </>
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
};

export default Orders;
