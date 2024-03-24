import { ISignInResponse } from "services/dtos";
import { keys } from "./keys";

class LocalStorageService {
  public static getDarkMode(): boolean | undefined {
    const localIsDarkMode = localStorage.getItem(keys.darkMode);

    return localIsDarkMode === "true"
      ? true
      : localIsDarkMode === "false"
        ? false
        : undefined;
  }

  public static setDarkMode(value: boolean): void {
    localStorage.setItem(keys.darkMode, String(value));
  }

  public static deleteDarkMode(): void {
    localStorage.removeItem(keys.darkMode);
  }

  public static getCollapseMenu(): boolean {
    return localStorage.getItem(keys.collapseMenu) === "true";
  }

  public static setCollapseMenu(value: boolean): void {
    localStorage.setItem(keys.collapseMenu, String(value));
  }

  public static deleteCollapseMenu(): void {
    localStorage.removeItem(keys.collapseMenu);
  }

  public static getLoginInformation(): ISignInResponse | null {
    const localLoginInformation = localStorage.getItem(keys.loginInformation);

    return localLoginInformation !== null
      ? JSON.parse(localLoginInformation)
      : null;
  }

  public static setLoginInformation(value: ISignInResponse): void {
    localStorage.setItem(keys.loginInformation, JSON.stringify(value));
  }

  public static deleteLoginInformation(): void {
    localStorage.removeItem(keys.loginInformation);
  }
}

export { LocalStorageService };
