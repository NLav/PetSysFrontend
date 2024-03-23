import { AxiosResponse } from "axios";
import { api } from "services/api";
import { ISignInResponse } from "services/dtos/IAuthDTO";
import { IUserDTO } from "services/dtos/IUserDTO";

class AuthService {
  public static async signIn(
    loginInformation: Omit<IUserDTO, "id">
  ): Promise<AxiosResponse<ISignInResponse>> {
    return await api.post("/auth/login", loginInformation);
  }
}

export { AuthService };
