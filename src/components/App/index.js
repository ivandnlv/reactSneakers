import { useEffect, useState } from "react";
import Main from "../../pages/Main";
import GetSneakers from "../../service/GetSneakers";
import AppContext from "../Context";
import Header from "../Header";
import axios from "axios";
import Slider from "../Slider";
import Cart from "../Cart";

function App() {

  const [sneakers, setSneakers] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);

  useEffect(() => {
      GetSneakers().then(res => setSneakers(res));
  }, []);

  const openCart = () => {
    setIsCartOpened(true);
  }

  const closeCart = () => {
    setIsCartOpened(false);
  }

  return (
    <div className="wrapper">
      <Header openCart={openCart}/>
      {isCartOpened ? <Cart closeCart={closeCart}/> : null}
      <hr />
      <div className="content">
        <Slider /> 
          <Main 
            sneakers={sneakers}
          />
      </div>
    </div>
  );
}

export default App;
