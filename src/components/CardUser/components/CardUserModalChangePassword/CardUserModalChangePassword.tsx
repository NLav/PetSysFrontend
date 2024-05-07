import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { Modal } from "components/Modal";
import { ToastContext } from "contexts";
import { useWindowSize } from "hooks";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserService } from "services";
import { IUserDTO } from "services/dtos";
import { generateId } from "utils";
import { z } from "zod";
import * as S from "./CardUserModalChangePassword.styles";

interface ICardUserModalChangePasswordProps {
  id: IUserDTO["id"];
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModalChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Campo obrigatório!"),
  passwords: z
    .object({
      password: z.string().min(1, "Campo obrigatório"),
      confirmPassword: z.string().min(1, "Campo obrigatório"),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: "As senhas devem ser iguais!",
      path: ["confirmPassword"],
    }),
});

type modalChangePasswordFormData = z.infer<typeof modalChangePasswordSchema>;

const CardUserModalChangePassword = ({
  id,
  setShowModalEdit,
  setShowModalChangePassword,
}: ICardUserModalChangePasswordProps) => {
  const { windowSize } = useWindowSize();

  const { addToast } = useContext(ToastContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<modalChangePasswordFormData>({
    resolver: zodResolver(modalChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      passwords: {
        password: "",
        confirmPassword: "",
      },
    },
  });

  const handleGoBack = () => {
    setShowModalEdit(true);
    setShowModalChangePassword(false);
  };

  const onSubmit = (data: modalChangePasswordFormData) => {
    UserService.changePassword(id, {
      currentPassword: data.currentPassword,
      newPassword: data.passwords.password,
    })
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso!",
          description: "A senha foi atualizada com sucesso!",
        });

        setShowModalEdit(true);
        setShowModalChangePassword(false);
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao atualizar a senha!",
          description: error.message,
        });
      });
  };

  return (
    <Modal
      title="Mudar senha"
      closeModal={() => {
        setShowModalEdit(true);
        setShowModalChangePassword(false);
      }}
      width={windowSize.width > 500 ? "30vw" : "90vw"}
    >
      <S.Container onSubmit={handleSubmit(onSubmit)}>
        <S.InputsContainer>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                id="input-current-password"
                title="Senha atual"
                value={value}
                onChange={onChange}
                errorMessage={errors.currentPassword?.message}
                required={true}
              />
            )}
          />

          <Controller
            name="passwords.password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                id="input-new-password"
                title="Nova senha"
                value={value}
                onChange={onChange}
                errorMessage={errors.passwords?.password?.message}
                required={true}
              />
            )}
          />

          <Controller
            name="passwords.confirmPassword"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                id="input-confirm-new-password"
                title="Confirme a nova senha"
                value={value}
                onChange={onChange}
                errorMessage={errors.passwords?.confirmPassword?.message}
                required={true}
              />
            )}
          />
        </S.InputsContainer>

        <S.ButtonsContainer>
          <Button
            variant="primary-ghost"
            type="button"
            onClick={() => handleGoBack()}
          >
            Voltar
          </Button>

          <Button variant="primary" type="submit">
            Concluir
          </Button>
        </S.ButtonsContainer>
      </S.Container>
    </Modal>
  );
};

export { CardUserModalChangePassword };
