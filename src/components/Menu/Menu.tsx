import { CaretDoubleLeft, List, PawPrint } from "@phosphor-icons/react";
import { ToggleDarkMode } from "components";
import { CollapseMenuContext } from "contexts";
import { useWindowSize } from "hooks";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LocalStorageService } from "services";
import * as S from "./Menu.styles";
import { MenuTooltip, ModalUserProfile } from "./components";

export interface IMenuOption {
  label: string;
  href: string;
  icon: React.ReactElement;
}

interface IMenuProps {
  menuOptions: IMenuOption[];
}

const Menu = ({ menuOptions }: IMenuProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showModalUserProfile, setShowModalUserProfile] = useState(false);

  const { collapseMenu, setCollapseMenu } = useContext(CollapseMenuContext);

  const { windowSize } = useWindowSize();

  if (windowSize.width <= 500) {
    return (
      <S.MobileContainer $openMenu={openMenu}>
        <S.MobileCollapseButton
          onClick={() => setOpenMenu((current) => !current)}
        >
          <List size={64} />
        </S.MobileCollapseButton>

        {openMenu && (
          <>
            <S.LogoContainer>
              <PawPrint size={136} />
              PetSys
            </S.LogoContainer>

            <S.MobileNavigationList>
              {menuOptions.map((option) => (
                <Link key={option.label} to={option.href}>
                  {option.icon}
                  {option.label}
                </Link>
              ))}
            </S.MobileNavigationList>

            <S.ToggleContainer>
              <ToggleDarkMode />
            </S.ToggleContainer>

            <S.UserContainer
              onClick={() => {
                setShowModalUserProfile((current) => !current);
                setOpenMenu(false);
              }}
              $collapseMenu={false}
            >
              <S.UserProfilePicture
                src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                alt="profile-picture"
              />

              <span>
                Olá, {LocalStorageService.getLoginInformation()?.name}
              </span>
            </S.UserContainer>
          </>
        )}

        {showModalUserProfile && (
          <ModalUserProfile setShowModalUserProfile={setShowModalUserProfile} />
        )}
      </S.MobileContainer>
    );
  }

  return (
    <S.DesktopContainer $collapseMenu={collapseMenu}>
      <S.DesktopCollapseButton onClick={() => setCollapseMenu(!collapseMenu)}>
        <CaretDoubleLeft
          size={16}
          weight="bold"
          style={{ rotate: collapseMenu ? "180deg" : "0deg" }}
        />
      </S.DesktopCollapseButton>

      <S.LogoContainer>
        <PawPrint size={collapseMenu ? 64 : 136} />

        {!collapseMenu ? "PetSys" : null}
      </S.LogoContainer>

      <S.DesktopNavigationList $collapseMenu={collapseMenu}>
        {menuOptions.map((option) =>
          collapseMenu ? (
            <MenuTooltip key={option.label} text={option.label}>
              <S.DesktopStyledLink
                to={option.href}
                $selected={window.location.pathname === option.href}
              >
                {option.icon}
                {!collapseMenu ? option.label : null}
              </S.DesktopStyledLink>
            </MenuTooltip>
          ) : (
            <S.DesktopStyledLink
              key={option.label}
              to={option.href}
              $selected={window.location.pathname === option.href}
            >
              {option.icon}
              {!collapseMenu ? option.label : null}
            </S.DesktopStyledLink>
          )
        )}
      </S.DesktopNavigationList>

      <S.ToggleContainer>
        <ToggleDarkMode iconsOutside={!collapseMenu} />
      </S.ToggleContainer>

      <S.UserContainer
        onClick={() => setShowModalUserProfile((current) => !current)}
        $collapseMenu={collapseMenu}
      >
        <S.UserProfilePicture
          src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
          alt="profile-picture"
        />

        {!collapseMenu && (
          <span>Olá, {LocalStorageService.getLoginInformation()?.name}</span>
        )}
      </S.UserContainer>

      {showModalUserProfile && (
        <ModalUserProfile setShowModalUserProfile={setShowModalUserProfile} />
      )}
    </S.DesktopContainer>
  );
};

export { Menu };
