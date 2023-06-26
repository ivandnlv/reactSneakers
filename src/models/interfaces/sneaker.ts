export interface ISneaker {
  id: number;
  title: string;
  img: string;
  price: number;
  sale: number;
}

export interface ICartSneaker extends ISneaker {
  salePrice?: number;
}
