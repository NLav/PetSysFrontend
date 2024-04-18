import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBarModalForm, Input } from "components";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import { PetsModals } from "views/Pets";
import { z } from "zod";

interface IPetOwnersModalFilterProps {
  setShowModal: React.Dispatch<React.SetStateAction<PetsModals>>;
}

const filterSchema = z.object({
  name: z.string(),
  address: z.string(),
});

type filterFormData = z.infer<typeof filterSchema>;

const PetOwnersModalFilter = ({ setShowModal }: IPetOwnersModalFilterProps) => {
  const dispatch = useAppDispatch();

  const { listingParams, meta } = useAppSelector((state) => state.petOwners);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<filterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: listingParams.name,
      address: listingParams.address,
    },
  });

  const handleClearFilter = () => {
    dispatch(
      getPetOwnersPaginated({
        listingParams: {
          ...listingParams,
          name: "",
          address: "",
        },
        meta,
      })
    );

    setShowModal(null);
  };

  const onSubmit = (data: filterFormData) => {
    dispatch(
      getPetOwnersPaginated({
        listingParams: {
          ...listingParams,
          ...data,
        },
        meta,
      })
    );

    setShowModal(null);
  };
  return (
    <ActionBarModalForm
      title="Filtrar Tutores"
      closeModal={() => setShowModal(null)}
      onSubmit={handleSubmit(onSubmit)}
      buttons={[
        {
          label: "Limpar Filtros",
          variant: "ghost",
          type: "button",
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
            id="input-name-pet-owner"
            title="Nome"
            value={value}
            onChange={onChange}
            errorMessage={errors.name?.message}
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
          />
        )}
      />
    </ActionBarModalForm>
  );
};

export { PetOwnersModalFilter };
