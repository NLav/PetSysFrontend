import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBarModalForm, Input } from "components";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import { PetsModals } from "views/Pets";
import { z } from "zod";

interface IPetOwnersModalSearchProps {
  setShowModal: React.Dispatch<React.SetStateAction<PetsModals>>;
}

const quickSearchSchema = z.object({
  quickSearch: z.string({ required_error: "Campo obrigatório!" }),
});

type quickSearchFormData = z.infer<typeof quickSearchSchema>;

const PetOwnersModalSearch = ({ setShowModal }: IPetOwnersModalSearchProps) => {
  const dispatch = useAppDispatch();

  const { listingParams, meta } = useAppSelector((state) => state.petOwners);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<quickSearchFormData>({
    resolver: zodResolver(quickSearchSchema),
    defaultValues: {
      quickSearch: listingParams.quickSearch,
    },
  });

  const onSubmit = (data: quickSearchFormData) => {
    dispatch(
      getPetOwnersPaginated({
        listingParams: { ...listingParams, quickSearch: data.quickSearch },
        meta,
      })
    );

    setShowModal(null);
  };

  const handleClearSearch = () => {
    dispatch(
      getPetOwnersPaginated({
        listingParams: { ...listingParams, quickSearch: "" },
        meta,
      })
    );

    setShowModal(null);
  };
  return (
    <ActionBarModalForm
      title="Pesquisa Rápida"
      closeModal={() => setShowModal(null)}
      onSubmit={handleSubmit(onSubmit)}
      buttons={[
        {
          label: "Limpar Pesquisa",
          variant: "ghost",
          type: "button",
          onClick: () => handleClearSearch(),
        },
        {
          label: "Pesquisar",
          variant: "primary",
          type: "submit",
        },
      ]}
    >
      <Controller
        name="quickSearch"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            id="pets-modal-search-input"
            title="Pesquisar"
            value={value}
            onChange={onChange}
            errorMessage={errors.quickSearch?.message}
          />
        )}
      />
    </ActionBarModalForm>
  );
};

export { PetOwnersModalSearch };
