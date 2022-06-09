import React, { useContext } from 'react';
import AppContext from '../components/Context';
import EmptyOrders from '../components/EmptyOrders';
import SneakersItem from '../components/SneakersItem';

const Orders = () => {
  const { orders } = useContext(AppContext);
  console.log(orders);

  return (
    <div className="sneakers">
      {orders.length !== 0 ? (
        <>
          <h1>Мои покупки</h1>
          <div className="sneakers__orders-list">
            {orders.map((item) => (
              <SneakersItem
                key={item.id}
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.salePrice ? item.price - item.salePrice : item.price}
              />
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
