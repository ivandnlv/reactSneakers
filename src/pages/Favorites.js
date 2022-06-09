import { useContext } from 'react';
import SneakersItem from '../components/SneakersItem';
import AppContext from '../components/Context';
import EmptyFavorites from '../components/EmptyFavorites';

const Favorites = () => {
  const { favoriteSneakers } = useContext(AppContext);
  return (
    <div className="sneakers">
      {favoriteSneakers.length !== 0 ? (
        <>
          <h1>Избранные кроссовки</h1>
          <div className="sneakers__list">
            {favoriteSneakers.map((item) => (
              <SneakersItem key={item.id} {...item} />
            ))}
          </div>
        </>
      ) : (
        <EmptyFavorites />
      )}
    </div>
  );
};

export default Favorites;
