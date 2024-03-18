import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBarModal, Button, Input } from "components";
import { RefreshListingContext } from "contexts";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { IPetGetAllParams } from "services/dtos";
import { z } from "zod";
import { petsModals } from "../../Pets";
import "./PetsModalFilter.scss";

interface IPetsModalFilterProps {
  listingParams: IPetGetAllParams;
  setListingParams: React.Dispatch<React.SetStateAction<IPetGetAllParams>>;
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const filterSchema = z.object({
  name: z.string(),
  birth_date: z.string(),
  breed: z.string(),
});

type filterFormData = z.infer<typeof filterSchema>;

const PetsModalFilter = ({
  listingParams,
  setListingParams,
  setShowModal,
}: IPetsModalFilterProps) => {
  const { setRefreshListing } = useContext(RefreshListingContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<filterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: listingParams.name,
      birth_date: String(listingParams.birth_date),
      breed: listingParams.breed,
    },
  });

  const handleClearFilter = () => {
    setListingParams((current) => ({
      ...current,
      name: "",
      birth_date: undefined,
      breed: "",
    }));

    setRefreshListing(true);
  };

  const onSubmit = (data: filterFormData) => {
    setListingParams((current) => ({
      ...current,
      ...data,
      birth_date: new Date(data.birth_date),
    }));

    setRefreshListing(true);
  };

  return (
    <ActionBarModal title="Filtrar Pets" closeModal={() => setShowModal(null)}>
      <form className="pets-modal-filter" onSubmit={handleSubmit(onSubmit)}>
        <div className="pets-modal-filter__inputs-container">
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
        </div>

        <div className="pets-modal-filter__buttons-container">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleClearFilter()}
          >
            Limpar Filtros
          </Button>

          <Button type="submit" variant="primary">
            Filtrar
          </Button>
        </div>
      </form>
    </ActionBarModal>
  );
};

export { PetsModalFilter };
