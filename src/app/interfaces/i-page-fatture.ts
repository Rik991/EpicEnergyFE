import { iFattura } from './i-fatture';

export interface iPageFatture {
  totalElements: number;
  totalPages: number;
  size: number;
  content: iFattura[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  pageable: Pageable;
  empty: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}
