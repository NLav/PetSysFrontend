import { AxiosResponse } from "axios";
import { api } from "services/api";
import { IPetDTO } from "services/dtos";

class PetService {
  public static async getAll(
    quickSearch?: string
  ): Promise<AxiosResponse<IPetDTO[]>> {
    return await api.get("/pets", {
      params: { quickSearch: quickSearch !== "" ? quickSearch : null },
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
