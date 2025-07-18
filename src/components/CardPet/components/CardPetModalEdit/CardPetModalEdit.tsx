import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Combobox, Input, Modal, Spinner } from "components";
import { ToastContext } from "contexts";
import { format } from "date-fns";
import { useWindowSize } from "hooks";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PetService } from "services";
import { IPetDTO } from "services/dtos";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersListed } from "stores/petOwners/thunks";
import { getPetsPaginated } from "stores/pets/thunks";
import { convertInputDateToDate, generateId, getInputDateMinMax } from "utils";
import { z } from "zod";
import * as S from "./CardPetModalEdit.styles";

interface ICardPetModalEditProps extends IPetDTO {
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const editPetSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório!" })
    .min(1, "Campo obrigatório!"),
  image_url: z.string().optional(),
  birth_date: z
    .string({ required_error: "Campo obrigatório!" })
    .min(1, "Campo obrigatório!"),
  breed: z
    .string({ required_error: "Campo obrigatório!" })
    .min(1, "Campo obrigatório!"),
  pet_owner_id: z.number().optional(),
});

type editPetFormData = z.infer<typeof editPetSchema>;

const CardPetModalEdit = ({
  id,
  name,
  image_url,
  birth_date,
  breed,
  pet_owner_id,
  setShowModalEdit,
}: ICardPetModalEditProps) => {
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  const dispatch = useAppDispatch();
  const { windowSize } = useWindowSize();

  const { listingParams, meta } = useAppSelector((state) => state.pets);
  const { petOwnersListed, loading } = useAppSelector(
    (state) => state.petOwners
  );

  const { addToast } = useContext(ToastContext);

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<editPetFormData>({
    resolver: zodResolver(editPetSchema),
    defaultValues: {
      name: name,
      image_url: image_url || "",
      birth_date: format(new Date(birth_date), "yyyy-MM-dd"),
      breed: breed,
      pet_owner_id: pet_owner_id,
    },
  });

  const handleSetPetOwner = (petOwnerName: string) => {
    setValue(
      "pet_owner_id",
      petOwnersListed.find((petOwner) => petOwner.name === petOwnerName)?.id
    );
  };

  const handleDelete = () => {
    PetService.delete(id)
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso",
          description: "Pet deletado com sucesso",
        });

        setShowModalEdit(false);

        dispatch(getPetsPaginated({ listingParams, meta }));
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao deletar pet",
          description: error.message,
        });
      });
  };

  const onSubmit = (data: editPetFormData) => {
    PetService.update(id, {
      ...data,
      birth_date: convertInputDateToDate(data.birth_date),
    })
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso",
          description: "Pet atualizado com sucesso",
        });

        setShowModalEdit(false);

        dispatch(getPetsPaginated({ listingParams, meta }));
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao atualizar pet",
          description: error.message,
        });
      });
  };

  useEffect(() => {
    dispatch(getPetOwnersListed());
  }, [dispatch]);

  return (
    <>
      {!showModalConfirmDelete && (
        <Modal
          title="Editar Pet"
          closeModal={() => setShowModalEdit(false)}
          width={windowSize.width > 500 ? "30vw" : "90vw"}
        >
          {loading.petOwnersListed ? (
            <S.SpinnerContainer>
              <Spinner />
            </S.SpinnerContainer>
          ) : (
            <S.Container onSubmit={handleSubmit(onSubmit)}>
              <S.InputsContainer>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="input-name-pet"
                      title="Nome"
                      value={value}
                      onChange={onChange}
                      errorMessage={errors.name?.message}
                      required={true}
                    />
                  )}
                />

                <Controller
                  name="image_url"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="input-image-url-pet"
                      title="Link da imagem"
                      value={value}
                      onChange={onChange}
                      errorMessage={errors.image_url?.message}
                    />
                  )}
                />

                <Controller
                  name="birth_date"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="input-birth-date-pet"
                      title="Data de nascimento"
                      type="date"
                      value={value}
                      onChange={onChange}
                      errorMessage={errors.birth_date?.message}
                      required={true}
                      min={getInputDateMinMax.min}
                      max={getInputDateMinMax.max}
                    />
                  )}
                />

                <Controller
                  name="breed"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="input-breed-pet"
                      title="Raça"
                      value={value}
                      onChange={onChange}
                      errorMessage={errors.breed?.message}
                      required={true}
                    />
                  )}
                />

                <Combobox
                  title="Tutor"
                  options={petOwnersListed.map((petOwner) => petOwner.name)}
                  searchable={true}
                  setValue={handleSetPetOwner}
                  value={
                    petOwnersListed.find(
                      (petOwner) => petOwner.id === watch("pet_owner_id")
                    )?.name
                  }
                />
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
          )}
        </Modal>
      )}

      {showModalConfirmDelete && (
        <Modal
          title="Deletar Pet?"
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
          O Pet <b>{name}</b> será deletado, essa ação é IRREVERSÍVEL. Tem
          certeza?
        </Modal>
      )}
    </>
  );
};

export { CardPetModalEdit };
