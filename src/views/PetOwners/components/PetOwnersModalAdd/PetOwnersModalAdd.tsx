import { zodResolver } from "@hookform/resolvers/zod";
import { ActionBarModalForm, Input } from "components";
import { ToastContext } from "contexts";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { PetOwnerService } from "services";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getPetOwnersPaginated } from "stores/petOwners/thunks";
import { generateId } from "utils";
import { PetOwnersModals } from "views/PetOwners";
import { z } from "zod";

interface IPetOwnerModalsAddProps {
  setShowModal: React.Dispatch<React.SetStateAction<PetOwnersModals>>;
}

const addPetOwnerSchema = z.object({
  name: z.string().min(1, "Campo obrigatório!"),
  address: z.string().min(1, "Campo obrigatório!"),
});

type addPetOwnerFormData = z.infer<typeof addPetOwnerSchema>;

const PetOwnersModalAdd = ({ setShowModal }: IPetOwnerModalsAddProps) => {
  const { listingParams, meta } = useAppSelector((state) => state.petOwners);

  const dispatch = useAppDispatch();

  const { addToast } = useContext(ToastContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<addPetOwnerFormData>({
    resolver: zodResolver(addPetOwnerSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const onSubmit = (data: addPetOwnerFormData) => {
    PetOwnerService.create(data)
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso",
          description: "Tutor adicionado com sucesso",
        });

        setShowModal(null);

        dispatch(getPetOwnersPaginated({ listingParams, meta }));
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao adicionar tutor",
          description: error.message,
        });
      });
  };

  return (
    <ActionBarModalForm
      title="Adicionar Tutor"
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

export { PetOwnersModalAdd };
