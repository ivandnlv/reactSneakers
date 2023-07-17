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
  startAfter,
  endBefore,
} from 'firebase/firestore/lite';
import { IFiltersState, filtersDefaultState } from '../redux/slices/filters';

const sneakersRef = collection(db, '/sneakers');
const sliderRef = collection(db, '/slider');

export const getSneakersTotalCount = async () => {
  const sneakersTotalQuery = await getCount(sneakersRef);

  return sneakersTotalQuery.data().count;
};

export interface IGetSneakersOptions {
  limitNum: number;
  filters: IFiltersState;
  startAfterId?: number;
  endBeforeId?: number;
}
export const getSneakers = async ({
  limitNum,
  filters,
  endBeforeId,
  startAfterId,
}: IGetSneakersOptions) => {
  const { brands, sale, sortBy, sortField } = filters;

  const startId = 1;

  let sneakersQuery = query(sneakersRef);

  if (brands.length) {
    sneakersQuery = query(sneakersQuery, where('brand', 'in', brands));
  }

  if (sale) {
    sneakersQuery = query(sneakersQuery, where('hasSale', '==', true));
  }

  if (sortBy === 'asc' && sortField !== 'id') {
    sneakersQuery = query(
      sneakersQuery,
      orderBy(sortField, sortBy),
      orderBy('id'),
      startAfter(startAfterId ?? startId),
    );
  } else if (sortBy === 'desc' && sortField !== 'id') {
    sneakersQuery = query(
      sneakersQuery,
      orderBy(sortField, sortBy),
      orderBy('id'),
      endBefore(endBeforeId ?? startId),
    );
  } else if (sortBy === 'asc' && sortField === 'id') {
    sneakersQuery = query(
      sneakersQuery,
      orderBy(sortField, sortBy),
      startAfter(startAfterId ?? startId),
    );
  } else if (sortBy === 'desc' && sortField === 'id') {
    sneakersQuery = query(
      sneakersQuery,
      orderBy(sortField, sortBy),
      endBefore(endBeforeId ?? startId),
    );
  }

  if (
    filters.sortBy === filtersDefaultState.sortBy &&
    filters.sortField === filtersDefaultState.sortField
  ) {
    sneakersQuery = query(sneakersQuery, limit(limitNum));
  }

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
