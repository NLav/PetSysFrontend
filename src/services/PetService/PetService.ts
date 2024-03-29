import { AxiosResponse } from "axios";
import { IPaginatedList, IPaginationMeta } from "interfaces";
import { api } from "services/api";
import { IPetDTO, IPetGetAllParams } from "services/dtos";

class PetService {
  public static async getAll(
    {
      orderBy,
      orderDirection,
      quickSearch,
      name,
      birth_date,
      breed,
    }: IPetGetAllParams,
    { restPage, restLimit }: IPaginationMeta
  ): Promise<AxiosResponse<IPaginatedList<IPetDTO>>> {
    return await api.get("/pets", {
      headers: { "rest-page": restPage, "rest-limit": restLimit },
      params: {
        orderBy,
        orderDirection,
        quickSearch: quickSearch !== "" ? quickSearch : null,
        name: name !== "" ? name : null,
        birth_date: birth_date !== "" ? birth_date : null,
        breed: breed !== "" ? breed : null,
      },
    });
  }

  public static async create(newPet: Omit<IPetDTO, "id">): Promise<IPetDTO> {
    return await api.post("/pets", newPet);
  }

  public static async update(
    petId: number,
    newPet: Omit<IPetDTO, "id" | "pet_owner">
  ): Promise<IPetDTO> {
    return await api.put(`/pets/${petId}`, newPet);
  }

  public static async delete(petId: number): Promise<IPetDTO> {
    return await api.delete(`/pets/${petId}`);
  }
}

export { PetService };
