import axios from 'axios';

const GetSneakers = async () => {
    const _items = 'https://628f5df8dc478523653f3f73.mockapi.io/items';
    const sneakers = await axios.get(_items).then(result => result.data);
    return sneakers;
};

export default GetSneakers;