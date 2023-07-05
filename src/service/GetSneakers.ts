import { db } from '../firebase';
import { ISneaker } from '../models/interfaces/sneaker';
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAt,
  getCount,
} from 'firebase/firestore/lite';

const collectionRef = collection(db, '/sneakers');

export interface IGetSneakersOptions {
  startId?: number;
  limitNum: number;
}

export const getSneakersTotalCount = async () => {
  const sneakersTotalQuery = await getCount(collectionRef);

  return sneakersTotalQuery.data().count;
};

export const getSneakers = async ({ limitNum, startId = 1 }: IGetSneakersOptions) => {
  const sneakersQuery = query(collectionRef, limit(limitNum), orderBy('id'), startAt(startId));
  const docSnapshot = await getDocs(sneakersQuery);
  if (!docSnapshot.empty) {
    const sneakers = docSnapshot.docs.map((doc) => doc.data());
    return sneakers as ISneaker[];
  } else {
    console.log('Документ не найден');
    return null;
  }
};

export const getSneakersWithFilters = async (limitNum: number) => {
  const q = query(collectionRef, orderBy('price', 'asc'), limit(limitNum));
  const querySnapshot = await getDocs(q);
};
