import Pageable from "./pageable";


export type Pagination = Pick<Pageable<any>, 'page' | 'size' | 'fromItems' | 'toItems'>;
