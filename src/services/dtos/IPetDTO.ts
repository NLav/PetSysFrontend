export interface IPetGetAllParams {
  quickSearch?: string;
  orderBy?: "created_date" | "name" | "birth_date" | "breed";
  orderDirection?: "asc" | "desc";
}

export interface IPetDTO {
  id: number;
  name: string;
  image_url?: string;
  birth_date: Date;
  breed: string;
}
