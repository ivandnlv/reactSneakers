import { Brands } from '../types/brands';

export interface ISneakersFilters {
  brands: Brands;
  onlySale: boolean;
  sort: 'default' | 'ascending' | 'descending';
}
