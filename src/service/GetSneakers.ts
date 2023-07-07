import { db } from '../firebase';
import { ISlide } from '../models/interfaces/slide';
import { ISneaker } from '../models/interfaces/sneaker';
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAt,
  getCount,
  where,
  endAt,
} from 'firebase/firestore/lite';
import { IFiltersState } from '../redux/slices/filters';

const sneakersRef = collection(db, '/sneakers');
const sliderRef = collection(db, '/slider');

export interface IGetSneakersOptions {
  startId?: number;
  limitNum: number;
  filters: IFiltersState;
}

export const getSneakersTotalCount = async () => {
  const sneakersTotalQuery = await getCount(sneakersRef);

  return sneakersTotalQuery.data().count;
};

export const getSneakers = async ({ limitNum, startId = 1, filters }: IGetSneakersOptions) => {
  const { brands, sale, sortBy, sortField } = filters;

  let sneakersQuery = query(sneakersRef);

  if (brands.length) {
    sneakersQuery = query(sneakersQuery, where('brand', 'in', brands));
  }

  if (sale) {
    sneakersQuery = query(sneakersQuery, where('hasSale', '==', true));
  }

  if (sortBy === 'asc') {
    sneakersQuery = query(sneakersQuery, orderBy(sortField, sortBy), startAt(startId));
  } else if (sortBy === 'desc') {
    sneakersQuery = query(sneakersQuery, orderBy(sortField, sortBy), endAt(startId));
  }

  sneakersQuery = query(sneakersQuery, limit(limitNum));

  const docSnapshot = await getDocs(sneakersQuery);

  if (!docSnapshot.empty) {
    const sneakers = docSnapshot.docs.map((doc) => doc.data());
    return sneakers as ISneaker[];
  } else {
    console.log('Документ не найден');
    return null;
  }
};

export const getSlides = async () => {
  const slidesQuery = query(sliderRef, orderBy('id', 'asc'));
  const slidesSnapshot = await getDocs(slidesQuery);

  if (!slidesSnapshot.empty) {
    const slides = slidesSnapshot.docs.map((doc) => doc.data());

    return slides as ISlide[];
  } else {
    console.log('Документы не найдены');
    return null;
  }
};
