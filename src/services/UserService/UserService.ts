import { AxiosResponse } from "axios";
import { IPaginatedList, IPaginationMeta } from "interfaces";
import { api } from "services/api";
import {
  IChangePasswordParams,
  IUserDTO,
  IUserGetAllParams,
} from "services/dtos";

class UserService {
  public static async getAll(
    { orderBy, orderDirection, quickSearch, name, email }: IUserGetAllParams,
    { restPage, restLimit }: IPaginationMeta
  ): Promise<AxiosResponse<IPaginatedList<Omit<IUserDTO, "password">>>> {
    return await api.get("/users", {
      headers: { "rest-page": restPage, "rest-limit": restLimit },
      params: {
        orderBy,
        orderDirection,
        quickSearch: quickSearch !== "" ? quickSearch : null,
        name: name !== "" ? name : null,
        email: email !== "" ? email : null,
      },
    });
  }

  public static async create(
    newUser: Omit<IUserDTO, "id">
  ): Promise<Pick<IUserDTO, "id">> {
    return await api.post("/users", newUser);
  }

  public static async update(
    userId: IUserDTO["id"],
    newUser: Omit<IUserDTO, "id" | "password">
  ): Promise<IUserDTO> {
    return await api.put(`/users/${userId}`, newUser);
  }

  public static async changePassword(
    userId: IUserDTO["id"],
    passwords: IChangePasswordParams
  ) {
    return await api.put(`/users/${userId}/change-password`, passwords);
  }

  public static async delete(
    userId: IUserDTO["id"]
  ): Promise<Pick<IUserDTO, "id">> {
    return await api.delete(`/users/${userId}`);
  }
}

export { UserService };
