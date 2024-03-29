import { AxiosResponse } from "axios";
import { IPaginatedList, IPaginationMeta } from "interfaces";
import { api } from "services/api";
import { IPetOwnerDTO, IPetOwnerGetAllParams } from "services/dtos";

class PetOwnerService {
  public static async getAll(
    {
      orderBy,
      orderDirection,
      quickSearch,
      name,
      address,
    }: IPetOwnerGetAllParams,
    { restPage, restLimit }: IPaginationMeta
  ): Promise<AxiosResponse<IPaginatedList<IPetOwnerDTO>>> {
    return await api.get("/pet-owners", {
      headers: { "rest-page": restPage, "rest-limit": restLimit },
      params: {
        orderBy,
        orderDirection,
        quickSearch: quickSearch === "" ? quickSearch : null,
        name: name === "" ? name : null,
        address: address === "" ? address : null,
      },
    });
  }
}

export { PetOwnerService };
