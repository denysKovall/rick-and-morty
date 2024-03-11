export default interface Pageable<T> {
  first: boolean;
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;

  content: T[];
  fromItems: number,
  toItems: number,
}
