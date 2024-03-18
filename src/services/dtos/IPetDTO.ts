export interface IPetGetAllParams
  extends Partial<Omit<IPetDTO, "id" | "image_url">> {
  orderBy: "name" | "birth_date" | "breed";
  orderDirection: "asc" | "desc";
  quickSearch: string;
}

export interface IPetDTO {
  id: number;
  name: string;
  image_url?: string;
  birth_date: Date;
  breed: string;
}
