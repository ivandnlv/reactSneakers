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
} from 'firebase/firestore/lite';
import { IFiltersState, filtersDefaultState } from '../redux/slices/filters';

const sneakersRef = collection(db, '/sneakers');
const sliderRef = collection(db, '/slider');

export interface IGetSneakersOptions {
  startId?: number;
  limitNum: number;
  filters: IFiltersState['filters'];
}

export const getSneakersTotalCount = async () => {
  const sneakersTotalQuery = await getCount(sneakersRef);

  return sneakersTotalQuery.data().count;
};

export const getSneakers = async ({ limitNum, startId = 1, filters }: IGetSneakersOptions) => {
  const { brands, sale, search, sortBy, sortField } = filters;

  const sortingField = 'id';

  let sneakersQuery = query(
    sneakersRef,
    limit(limitNum),
    orderBy(sortField, sortBy),
    startAt(startId),
  );

  if (brands.length) {
    sneakersQuery = query(sneakersQuery, where('brand', 'in', brands));
  }

  if (sale) {
    sneakersQuery = query(sneakersQuery, where('sale', '>=', 0));
  }

  const docSnapshot = await getDocs(sneakersQuery);

  console.log(docSnapshot);
  if (!docSnapshot.empty) {
    const sneakers = docSnapshot.docs.map((doc) => doc.data());
    return sneakers as ISneaker[];
  } else {
    console.log('Документ не найден');
    return null;
  }
};

export const getSneakersWithFilters = async (limitNum: number) => {
  const q = query(sneakersRef, orderBy('price', 'asc'), limit(limitNum));
  const querySnapshot = await getDocs(q);
};

export const getSlides = async () => {
  const slidesQuery = query(sliderRef, orderBy('id', 'asc'));
  const slidesSnapshot = await getDocs(slidesQuery);

  if (!slidesSnapshot.empty) {
    const slides = slidesSnapshot.docs.map((doc) => doc.data());

    console.log(slides);

    return slides as ISlide[];
  } else {
    console.log('Документы не найдены');
    return null;
  }
};
