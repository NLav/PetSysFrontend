import { AxiosResponse } from "axios";
import { api } from "services/api";
import { IPetDTO, IPetGetAllParams } from "services/dtos";
import { IPaginatedList, IPaginationMeta } from "types";

class PetService {
  public static async getAll(
    { quickSearch, orderBy, orderDirection }: IPetGetAllParams,
    { restPage: restPage, restLimit: restLimit }: IPaginationMeta
  ): Promise<AxiosResponse<IPaginatedList<IPetDTO>>> {
    return await api.get("/pets", {
      headers: { "rest-page": restPage, "rest-limit": restLimit },
      params: {
        quickSearch: quickSearch !== "" ? quickSearch : null,
        orderBy,
        orderDirection,
      },
    });
  }

  public static async create(newPet: Omit<IPetDTO, "id">): Promise<IPetDTO> {
    return await api.post("/pets", newPet);
  }

  public static async update(
    petId: number,
    newPet: Omit<IPetDTO, "id">
  ): Promise<IPetDTO> {
    return await api.put(`/pets/${petId}`, newPet);
  }

  public static async delete(petId: number): Promise<IPetDTO> {
    return await api.delete(`/pets/${petId}`);
  }
}

export { PetService };
