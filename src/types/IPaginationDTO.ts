export interface IPaginationMeta {
  restPage: string;
  restLimit: string;
  restTotal: number;
}

export interface IPaginatedList<T> {
  items: T[];
  meta: IPaginationMeta;
}
