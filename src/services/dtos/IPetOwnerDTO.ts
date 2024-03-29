import { IPetDTO } from ".";

export interface IPetOwnerGetAllParams
  extends Omit<IPetOwnerDTO, "id" | "pets"> {
  orderBy: "name" | "address";
  orderDirection: "asc" | "desc";
  quickSearch: string;
}

export interface IPetOwnerDTO {
  id: number;
  name: string;
  address: string;
  pets: IPetDTO[];
}
