import { AxiosResponse } from "axios";
import { IPaginatedList, IPaginationMeta } from "interfaces";
import { api } from "services/api";
import { IPetOwnerDTO, IPetOwnerGetAllParams } from "services/dtos";

class PetOwnerService {
  public static async getAllListed(): Promise<IPetOwnerDTO[]> {
    return await api.get("/pet-owners", { headers: { "rest-mode": "list" } });
  }

  public static async getAllPaginated(
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
      headers: {
        "rest-page": restPage,
        "rest-limit": restLimit,
        "rest-mode": "paginate",
      },
      params: {
        orderBy,
        orderDirection,
        quickSearch: quickSearch === "" ? quickSearch : null,
        name: name === "" ? name : null,
        address: address === "" ? address : null,
      },
    });
  }

  public static async create(
    newPet: Omit<IPetOwnerDTO, "id" | "pets">
  ): Promise<IPetOwnerDTO> {
    return await api.post("/pet-owners", newPet);
  }

  public static async update(
    petOwnerId: number,
    newPetOwner: Omit<IPetOwnerDTO, "id" | "pets">
  ): Promise<IPetOwnerDTO> {
    return await api.put(`/pet-owners/${petOwnerId}`, newPetOwner);
  }
}

export { PetOwnerService };
