import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBarModal, Button, Input } from "components";
import { RefreshListingContext } from "contexts";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { IPetGetAllParams } from "services/dtos";
import { z } from "zod";
import { petsModals } from "../../Pets";
import "./PetsModalSearch.scss";

interface IPetsModalSearchProps {
  listingParams: IPetGetAllParams;
  setListingParams: React.Dispatch<React.SetStateAction<IPetGetAllParams>>;
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
}

const quickSearchSchema = z.object({
  quickSearch: z.string({ required_error: "Campo obrigatório!" }),
});

type quickSearchFormData = z.infer<typeof quickSearchSchema>;

const PetsModalSearch = ({
  listingParams,
  setListingParams,
  setShowModal,
}: IPetsModalSearchProps) => {
  const { setRefreshListing } = useContext(RefreshListingContext);

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
    setListingParams((current) => ({
      ...current,
      quickSearch: data.quickSearch,
    }));
    setRefreshListing(true);
  };

  const handleClearSearch = () => {
    setListingParams((current) => ({ ...current, quickSearch: "" }));
    setRefreshListing(true);
  };

  return (
    <ActionBarModal
      title="Pesquisa Rápida"
      closeModal={() => setShowModal(null)}
    >
      <form className="pets-modal-search" onSubmit={handleSubmit(onSubmit)}>
        <div className="pets-modal-search__input-container">
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
        </div>

        <div className="pets-modal-search__buttons-container">
          <Button
            variant="ghost"
            onClick={() => {
              handleClearSearch();
            }}
          >
            Limpar Pesquisa
          </Button>

          <Button type="submit" variant="primary">
            Pesquisar
          </Button>
        </div>
      </form>
    </ActionBarModal>
  );
};

export { PetsModalSearch };
