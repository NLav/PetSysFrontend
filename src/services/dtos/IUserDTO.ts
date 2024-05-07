export interface IUserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserGetAllParams
  extends Partial<Omit<IUserDTO, "id" | "password">> {
  orderBy: "name" | "email";
  orderDirection: "asc" | "desc";
  quickSearch: string;
}

export interface IChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}
