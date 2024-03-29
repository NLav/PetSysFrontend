export interface IPaginationMeta {
  restPage: string;
  restLimit: string;
  restTotal: number;
  restMode?: "list" | "paginate";
}

export interface IPaginatedList<T> {
  items: T[];
  meta: IPaginationMeta;
}
