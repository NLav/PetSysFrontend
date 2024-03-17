import { AxiosResponse } from "axios";
import { api } from "services/api";
import { IPetDTO } from "services/dtos";

class PetService {
  public static async getAll(): Promise<AxiosResponse<IPetDTO[]>> {
    const response = await api.get("/pets");

    return response;
  }

  public static async create(newPet: Omit<IPetDTO, "id">): Promise<IPetDTO> {
    return await api.post("/pets", newPet);
  }
}

export { PetService };
