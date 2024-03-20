import { ActionBarModal, Button } from "components";
import { IActionBarModalProps } from "components/ActionBarModal/ActionBarModal";
import * as S from "./ActionBarModalForm.styles";

interface IActionBarModalFormProps extends IActionBarModalProps {}

const ActionBarModalForm = ({
  closeModal,
  buttons,
  title,
  children,
  ...rest
}: IActionBarModalFormProps) => {
  return (
    <ActionBarModal title={title} closeModal={closeModal}>
      <S.Container {...rest}>
        <S.InputsContainer>{children}</S.InputsContainer>

        {buttons && (
          <S.ButtonsContainer>
            {buttons.map((button) => (
              <Button
                key={button.label}
                variant={button.variant}
                onClick={button.onClick}
                type={button.type}
              >
                {button.label}
              </Button>
            ))}
          </S.ButtonsContainer>
        )}
      </S.Container>
    </ActionBarModal>
  );
};

export { ActionBarModalForm };
