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
}

export { LocalStorageService };
