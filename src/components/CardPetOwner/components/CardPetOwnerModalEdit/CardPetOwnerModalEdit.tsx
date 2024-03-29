import { zodResolver } from "@hookform/resolvers/zod";
import { CameraSlash } from "@phosphor-icons/react";
import { Button, Input, Modal } from "components";
import { ToastContext } from "contexts";
import { useWindowSize } from "hooks";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { PetOwnerService } from "services";
import { IPetOwnerDTO } from "services/dtos";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import { generateId } from "utils";
import { z } from "zod";
import * as S from "./CardPetOwnerModalEdit.styles";

interface ICardPetOwnerModalEditProps extends IPetOwnerDTO {
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const editPetOwnerSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  address: z.string().min(1, "Campo obrigatório"),
});

type editPetOwnerFormData = z.infer<typeof editPetOwnerSchema>;

const CardPetOwnerModalEdit = ({
  id,
  name,
  address,
  pets,
  setShowModalEdit,
}: ICardPetOwnerModalEditProps) => {
  const { windowSize } = useWindowSize();

  const { addToast } = useContext(ToastContext);

  const { listingParams, meta } = useAppSelector((state) => state.petOwners);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPetOwnerSchema),
    defaultValues: {
      name: name,
      address: address,
      petIds: pets.map((pet) => pet.id),
    },
  });

  const onSubmit = (data: editPetOwnerFormData) => {
    PetOwnerService.update(id, data)
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso",
          description: "Tutor atualizado com sucesso",
        });

        setShowModalEdit(false);

        dispatch(getPetOwnersPaginated({ listingParams, meta }));
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao atualizar tutor",
          description: error.message,
        });
      });
  };

  return (
    <Modal
      title="Editar Tutor"
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
                id="input-name-pet-owner"
                title="Nome"
                value={value}
                onChange={onChange}
                errorMessage={errors.name?.message}
                required={true}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                id="input-address-pet-owner"
                title="Endereço"
                value={value}
                onChange={onChange}
                errorMessage={errors.address?.message}
                required={true}
              />
            )}
          />

          <S.PetsActionBar>Pets</S.PetsActionBar>

          <S.PetsContainer>
            {pets.map((pet) => (
              <S.PetsCard key={pet.id}>
                <div>
                  {pet.image_url ? (
                    <img src={pet.image_url} alt={`${pet.name}-picture`} />
                  ) : (
                    <S.NoImageContainer>
                      <CameraSlash size={"50%"} />
                      Sem Imagem
                    </S.NoImageContainer>
                  )}
                </div>

                <span>{pet.name}</span>
              </S.PetsCard>
            ))}
          </S.PetsContainer>
        </S.InputsContainer>

        <S.ButtonsContainer>
          <Button type="button" variant="danger">
            Deletar
          </Button>

          <Button type="submit" variant="primary">
            Atualizar
          </Button>
        </S.ButtonsContainer>
      </S.Container>
    </Modal>
  );
};

export { CardPetOwnerModalEdit };
