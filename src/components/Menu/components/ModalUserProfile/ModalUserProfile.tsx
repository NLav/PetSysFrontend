import { SignOut } from "@phosphor-icons/react";
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

  useOnClickOutside(modalRef, () => setShowModalUserProfile(false));
  return (
    <S.Container ref={modalRef}>
      <div>
        <S.UserProfilePicture
          src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
          alt="profile-picture"
        />

        <S.UserName>
          {LocalStorageService.getLoginInformation()?.name}
        </S.UserName>

        <S.UserEmail>pedro@example.com</S.UserEmail>
      </div>

      <Button variant="danger" onClick={() => handleLogout()}>
        <SignOut /> Sair
      </Button>
    </S.Container>
  );
};

export { ModalUserProfile };
