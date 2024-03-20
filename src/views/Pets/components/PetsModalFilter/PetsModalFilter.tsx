import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBarModalForm, Input } from "components";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetsPaginated } from "stores/pets/thunks";
import { convertInputDateToDate } from "utils";
import { z } from "zod";
import { petsModals } from "../../Pets";

interface IPetsModalFilterProps {
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const filterSchema = z.object({
  name: z.string(),
  birth_date: z.string(),
  breed: z.string(),
});

type filterFormData = z.infer<typeof filterSchema>;

const PetsModalFilter = ({ setShowModal }: IPetsModalFilterProps) => {
  const dispatch = useAppDispatch();

  const { listingParams, meta } = useAppSelector((state) => state.pets);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<filterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: listingParams.name,
      birth_date: listingParams.birth_date
        ? listingParams.birth_date === "undefined" ||
          listingParams.birth_date === ""
          ? ""
          : format(new Date(listingParams.birth_date), "yyyy-MM-dd")
        : "",
      breed: listingParams.breed,
    },
  });

  const handleClearFilter = () => {
    dispatch(
      getPetsPaginated({
        listingParams: {
          ...listingParams,
          name: "",
          birth_date: "",
          breed: "",
        },
        meta,
      })
    );

    setShowModal(null);
  };

  const onSubmit = (data: filterFormData) => {
    dispatch(
      getPetsPaginated({
        listingParams: {
          ...listingParams,
          ...data,
          birth_date:
            data.birth_date &&
            data.birth_date !== "Invalid Date" &&
            data.birth_date !== "undefined"
              ? convertInputDateToDate(data.birth_date)
              : undefined,
        },
        meta,
      })
    );

    setShowModal(null);
  };

  return (
    <ActionBarModalForm
      title="Filtrar Pets"
      closeModal={() => setShowModal(null)}
      onSubmit={handleSubmit(onSubmit)}
      buttons={[
        {
          label: "Limpar Filtros",
          variant: "ghost",
          onClick: () => handleClearFilter(),
        },
        {
          label: "Filtrar",
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
          />
        )}
      />
    </ActionBarModalForm>
  );
};

export { PetsModalFilter };
