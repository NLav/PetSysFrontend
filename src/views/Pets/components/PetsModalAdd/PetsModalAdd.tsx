import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBarModalForm, Combobox, Input } from "components";
import { ToastContext } from "contexts";
import { format } from "date-fns";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { PetService } from "services";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersListed } from "stores/petOwners/thunks";
import { getPetsPaginated } from "stores/pets/thunks";
import { convertInputDateToDate, generateId, getInputDateMinMax } from "utils";
import { z } from "zod";
import { petsModals } from "../../Pets";

interface IPetsModalAddProps {
  setShowModal: React.Dispatch<React.SetStateAction<petsModals>>;
}

const addPetSchema = z.object({
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

type addPetFormData = z.infer<typeof addPetSchema>;

const PetsModalAdd = ({ setShowModal }: IPetsModalAddProps) => {
  const { listingParams, meta } = useAppSelector((state) => state.pets);
  const { petOwnersListed } = useAppSelector((state) => state.petOwners);

  const dispatch = useAppDispatch();

  const { addToast } = useContext(ToastContext);

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addPetFormData>({
    resolver: zodResolver(addPetSchema),
    defaultValues: {
      name: "",
      image_url: "",
      birth_date: format(new Date(), "yyyy-MM-dd"),
      breed: "",
    },
  });

  const handleSetPetOwner = (petOwnerName: string) => {
    setValue(
      "pet_owner_id",
      petOwnersListed.find((petOwner) => petOwner.name === petOwnerName)?.id
    );
  };

  const onSubmit = (data: addPetFormData) => {
    PetService.create({
      ...data,
      birth_date: convertInputDateToDate(data.birth_date),
    })
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso",
          description: "Pet adicionado com sucesso",
        });

        setShowModal(null);

        dispatch(getPetsPaginated({ listingParams, meta }));
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao adicionar pet",
          description: error.message,
        });
      });
  };

  useEffect(() => {
    dispatch(getPetOwnersListed());
  }, [dispatch]);

  return (
    <ActionBarModalForm
      title="Adicionar Pet"
      closeModal={() => setShowModal(null)}
      onSubmit={handleSubmit(onSubmit)}
      buttons={[
        {
          label: "Adicionar",
          variant: "primary",
          type: "submit",
        },
      ]}
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            id="input-nome-pet"
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
            id="input-link-da-imagem-pet"
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
            id="input-data-de-nascimento-pet"
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
            id="input-raca-pet"
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
          )?.name || ""
        }
      />
    </ActionBarModalForm>
  );
};

export { PetsModalAdd };
