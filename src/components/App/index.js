import { useEffect, useState } from "react";
import Main from "../../pages/Main";
import GetSneakers from "../../service/GetSneakers";
import Header from "../Header";
import Slider from "../Slider";
import AppContext from '../Context';
import Cart from "../Cart";

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [cartSneakers, setCartSneakers] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(0);
  const [sneakersFilters, setSneakersFilters] = useState({});

  useEffect(() => {
      setLoading(true);
      const localCartSneakers = JSON.parse(localStorage.getItem('cartSneakers'));
      setCartSneakers([...localCartSneakers]);
      GetSneakers()
        .then(res => setSneakers(res))
        .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartSneakers', JSON.stringify(cartSneakers));
    let sum = 0;
    cartSneakers.forEach(item => item.salePrice ? sum += item.salePrice : sum += item.price);
    setSum(sum);
  },[cartSneakers])

  const openCart = () => {
    setIsCartOpened(true);
  }

  const closeCart = () => {
    setIsCartOpened(false);
  }

  const sneakerToCart = (obj) => {
    if (cartSneakers.find(item => item.img === obj.img)) {
      setCartSneakers(prev => prev.filter(item => item.img !== obj.img));
    } else {
      setCartSneakers(prev => [...prev, obj]);
    }
  }

  const deleteFromCart = (obj) => {
    setCartSneakers(prev => prev.filter(item => item.img !== obj.img));
  }

  const isAlreadyInCart = (img) => {
    return cartSneakers.find(item => item.img === img);
  }

  const priceMoreThan10 = (price) => {
    if (price > 10000) {
        let str = `${price}`;
        return `${str.slice(0,2)} ${str.slice(2)}`;
    } else return price;
}


  return (
    <div className="wrapper">
      <AppContext.Provider value={{sneakers, cartSneakers, sneakerToCart, deleteFromCart, isAlreadyInCart, priceMoreThan10, sneakersFilters, setSneakersFilters}}>
        <Header openCart={openCart} sum={sum}/>
        {isCartOpened ? <Cart closeCart={closeCart} sum={sum}/> : null}
        <hr />
        <div className="content">
          <Slider /> 
          <Main 
            sneakers={sneakers} 
            loading={loading}
          />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
