import { SignOut, X } from "@phosphor-icons/react";
import { Button } from "components";
import { useRef } from "react";
import { LocalStorageService } from "services";
import { useOnClickOutside } from "usehooks-ts";
import { handleLogout } from "utils";
import * as S from "./ModalUserProfile.styles";

interface IModalUserProfileProps {
  setShowModalUserProfile: (value: React.SetStateAction<boolean>) => void;
}

const ModalUserProfile = ({
  setShowModalUserProfile,
}: IModalUserProfileProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = () => {
    setShowModalUserProfile(false);
  };

  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.Container ref={modalRef}>
      <S.CloseButton onClick={() => handleCloseModal()}>
        <X size={24} />
      </S.CloseButton>

      <div>
        <S.UserProfilePicture
          src={LocalStorageService.getLoginInformation()?.image_url}
          alt="profile-picture"
        />

        <S.UserName>
          {LocalStorageService.getLoginInformation()?.name}
        </S.UserName>

        <S.UserEmail>
          {LocalStorageService.getLoginInformation()?.email}
        </S.UserEmail>
      </div>

      <Button variant="danger" onClick={() => handleLogout()}>
        <SignOut /> Sair
      </Button>
    </S.Container>
  );
};

export { ModalUserProfile };
