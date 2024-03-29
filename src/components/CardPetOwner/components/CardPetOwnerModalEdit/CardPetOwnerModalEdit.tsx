import { zodResolver } from "@hookform/resolvers/zod";
import { CameraSlash, Plus, Trash } from "@phosphor-icons/react";
import { Button, Input, Modal } from "components";
import { useWindowSize } from "hooks";
import { Controller, useForm } from "react-hook-form";
import { IPetOwnerDTO } from "services/dtos";
import { z } from "zod";
import * as S from "./CardPetOwnerModalEdit.styles";

interface ICardPetOwnerModalEditProps extends IPetOwnerDTO {
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const editPetOwnerSchema = z.object({
  name: z.string().min(1, "Campo Obrigatório"),
  address: z.string().min(1, "Campo Obrigatório"),
  pets: z.number().array().optional(),
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

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPetOwnerSchema),
    defaultValues: {
      name: name,
      address: address,
      pets: pets.map((pet) => pet.id),
    },
  });

  const handleRemovePet = (petId: number) => {
    setValue(
      "pets",
      watch("pets").filter((pet) => pet !== petId)
    );
  };

  const onSubmit = (data: editPetOwnerFormData) => {
    console.log(data);
  };

  return (
    <Modal
      title="Editar Tutor"
      closeModal={() => setShowModalEdit(false)}
      width={windowSize.width > 500 ? "30vw" : "90vw"}
    >
      <S.Container onSubmit={handleSubmit(onSubmit)}>
        <button onClick={() => console.log(watch("pets"))}>here</button>

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

          <S.PetsActionBar>
            <span>Pets</span>

            <button type="button">
              <Plus size={24} />
            </button>
          </S.PetsActionBar>

          <S.PetsContainer>
            {pets
              .filter((pet) => watch("pets").includes(pet.id))
              .map((pet) => (
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

                  <button type="button" onClick={() => handleRemovePet(pet.id)}>
                    <Trash size={24} />
                  </button>
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
