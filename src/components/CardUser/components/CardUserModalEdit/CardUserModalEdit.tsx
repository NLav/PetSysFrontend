import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal } from "components";
import { ToastContext } from "contexts";
import { useWindowSize } from "hooks";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserService } from "services";
import { IUserDTO } from "services/dtos";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getUsersPaginated } from "stores/users/thunks";
import { generateId } from "utils";
import { z } from "zod";
import * as S from "./CardUserModalEdit.styles";

interface ICardUserModalEditProps extends Omit<IUserDTO, "password"> {
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModalChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const editUserSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório!" })
    .min(1, "Campo obrigatório!"),
  email: z
    .string({ required_error: "Campo obrigatório!" })
    .min(1, "Campo obrigatório!"),
});

type editUserFormData = z.infer<typeof editUserSchema>;

const CardUserModalEdit = ({
  id,
  name,
  email,
  setShowModalEdit,
  setShowModalChangePassword,
}: ICardUserModalEditProps) => {
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  const dispatch = useAppDispatch();
  const { windowSize } = useWindowSize();

  const { listingParams, meta } = useAppSelector((state) => state.users);

  const { addToast } = useContext(ToastContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<editUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: name,
      email: email,
    },
  });

  const handleDelete = () => {
    UserService.delete(id)
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso",
          description: "Usuário deletado com sucesso",
        });

        setShowModalEdit(false);

        dispatch(getUsersPaginated({ listingParams, meta }));
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao deletar usuário",
          description: error.message,
        });
      });
  };

  const onSubmit = (data: editUserFormData) => {
    UserService.update(id, data)
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso",
          description: "Usuário atualizado com sucesso",
        });

        setShowModalEdit(false);

        dispatch(getUsersPaginated({ listingParams, meta }));
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao atualizar usuário",
          description: error.message,
        });
      });
  };

  return (
    <>
      {!showModalConfirmDelete && (
        <Modal
          title="Editar Usuário"
          closeModal={() => setShowModalEdit(false)}
          width={windowSize.width > 500 ? "30vw" : "90vw"}
        >
          <S.Container onSubmit={handleSubmit(onSubmit)}>
            <S.InputsContainer>
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    id="input-name-user"
                    title="Nome"
                    value={value}
                    onChange={onChange}
                    errorMessage={errors.name?.message}
                    required={true}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    id="input-name-email"
                    title="E-mail"
                    value={value}
                    onChange={onChange}
                    errorMessage={errors.email?.message}
                    required={true}
                  />
                )}
              />

              <button
                onClick={() => {
                  setShowModalEdit(false);
                  setShowModalChangePassword(true);
                }}
              >
                Trocar senha
              </button>
            </S.InputsContainer>
            <S.ButtonsContainer>
              <Button
                type="button"
                variant="danger"
                onClick={() => setShowModalConfirmDelete(true)}
              >
                Deletar
              </Button>

              <Button type="submit" variant="primary">
                Atualizar
              </Button>
            </S.ButtonsContainer>
          </S.Container>
        </Modal>
      )}

      {showModalConfirmDelete && (
        <Modal
          title="Deletar Usuário?"
          closeModal={() => setShowModalConfirmDelete(false)}
          buttons={[
            {
              label: "Não",
              variant: "danger",
              onClick: () => setShowModalConfirmDelete(false),
            },
            {
              label: "Sim",
              variant: "primary",
              onClick: () => handleDelete(),
            },
          ]}
        >
          O Usuário <b>{name}</b> será deletado, essa ação é IRREVERSÍVEL. Tem
          certeza?
        </Modal>
      )}
    </>
  );
};

export { CardUserModalEdit };
