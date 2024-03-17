import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBarModal, Button, Input } from "components";
import { ToastContext } from "contexts";
import { format } from "date-fns";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { PetService } from "services";
import { z } from "zod";
import { petsModals } from "../../Pets";
import "./PetsModalAdd.scss";

interface IPetsModalAddProps {
  setShowModal: React.Dispatch<React.SetStateAction<typeof petsModals>>;
  setRefreshListing: React.Dispatch<React.SetStateAction<boolean>>;
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
});

type addPetFormData = z.infer<typeof addPetSchema>;

const PetsModalAdd = ({
  setShowModal,
  setRefreshListing,
}: IPetsModalAddProps) => {
  const { setToast } = useContext(ToastContext);

  const {
    control,
    handleSubmit,
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

  const onSubmit = (data: addPetFormData) => {
    PetService.create({
      ...data,
      birth_date: new Date(data.birth_date),
    })
      .then(() => {
        setToast({
          variant: "success",
          title: "Sucesso",
          description: "Pet criado com sucesso",
        });

        setShowModal(null);
        setRefreshListing(true);
      })
      .catch((error: any) => {
        setToast({
          variant: "danger",
          title: "Erro ao adicionar Pet",
          description: error.message,
        });
      });
  };

  return (
    <ActionBarModal title="Adicionar Pet" closeModal={() => setShowModal(null)}>
      <form className="pets-modal-add" onSubmit={handleSubmit(onSubmit)}>
        <div className="pets-modal-add__inputs-container">
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
        </div>

        <Button type="submit">Adicionar</Button>
      </form>
    </ActionBarModal>
  );
};

export { PetsModalAdd };
