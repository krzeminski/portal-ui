
export interface Paging<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalPages: number;
  totalElements: number;
}

export interface Pageable {
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged?: boolean;
}
