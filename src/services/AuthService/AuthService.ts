import { api } from "services/api";
import { ISignInResponse, IUserDTO } from "services/dtos";

class AuthService {
  public static async signIn(
    loginInformation: Omit<IUserDTO, "id" | "name">
  ): Promise<ISignInResponse> {
    const response = await api.post("/auth/login", loginInformation);

    return response.data;
  }
}

export { AuthService };
