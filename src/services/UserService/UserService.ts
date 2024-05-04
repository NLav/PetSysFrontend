import { api } from "services/api";
import { IUserDTO } from "services/dtos";

class UserService {
  public static async create(
    newUser: Omit<IUserDTO, "id">
  ): Promise<Pick<IUserDTO, "id">> {
    return await api.post("/users", newUser);
  }
}

export { UserService };
