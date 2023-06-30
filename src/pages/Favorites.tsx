import SneakersItem from '../components/SneakersItem';
import EmptyFavorites from '../components/EmptyFavorites';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Favorites = () => {
  const { favSneakers } = useTypedSelector((state) => state.favorites);
  return (
    <div className="sneakers">
      {favSneakers && favSneakers.length !== 0 ? (
        <>
          <h1>Избранные кроссовки</h1>
          <div className="sneakers__list">
            {favSneakers.map((item) => (
              <SneakersItem key={item.id} sneaker={item} />
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
