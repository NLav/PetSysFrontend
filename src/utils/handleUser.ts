import { LocalStorageService } from "services";

export const handleLogout = () => {
  LocalStorageService.deleteLoginInformation();
  window.location.href = "/login";
};
