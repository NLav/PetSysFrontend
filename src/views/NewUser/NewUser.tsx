import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "components";
import { ToastContext } from "contexts";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserService } from "services";
import { generateId } from "utils";
import { z } from "zod";
import * as S from "./NewUser.styles";

const newUserSchema = z.object({
  name: z.string().min(1, "Campo obrigatório!"),
  email: z.string().min(1, "Campo obrigatório!").email("E-mail inválido!"),
  passwords: z
    .object({
      password: z.string().min(1, "Campo obrigatório"),
      confirmPassword: z.string().min(1, "Campo obrigatório"),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: "As senhas devem ser iguais!",
      path: ["confirmPassword"],
    }),
});

type newUserFormData = z.infer<typeof newUserSchema>;

const NewUser = () => {
  const { addToast } = useContext(ToastContext);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<newUserFormData>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: "",
      email: "",
      passwords: {
        password: "",
        confirmPassword: "",
      },
    },
  });

  const onSubmit = (data: newUserFormData) => {
    UserService.create({
      name: data.name,
      email: data.email,
      password: data.passwords.password,
    })
      .then(() => {
        addToast({
          id: generateId(),
          variant: "success",
          title: "Sucesso",
          description: "Usuário criado com sucesso",
        });

        handleGoBack();
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao criar usuário",
          description: error.message,
        });
      });
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <S.InputsContainer>
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              id="input-name"
              title="Nome"
              value={value}
              onChange={onChange}
              errorMessage={errors.name?.message}
              required={true}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              id="input-email"
              title="E-mail"
              value={value}
              onChange={onChange}
              errorMessage={errors.email?.message}
              required={true}
            />
          )}
        />

        <Controller
          name="passwords.password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              id="input-password"
              title="Senha"
              value={value}
              type="password"
              onChange={onChange}
              errorMessage={errors.passwords?.password?.message}
              required={true}
            />
          )}
        />

        <Controller
          name="passwords.confirmPassword"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              id="input-confirm-password"
              title="Confirmar senha"
              value={value}
              type="password"
              onChange={onChange}
              errorMessage={errors.passwords?.confirmPassword?.message}
              required={true}
            />
          )}
        />
      </S.InputsContainer>

      <S.ButtonsContainer>
        <Button
          variant="white-ghost"
          type="button"
          onClick={() => handleGoBack()}
        >
          Voltar
        </Button>

        <Button variant="secondary" type="submit">
          Criar
        </Button>
      </S.ButtonsContainer>
    </S.Container>
  );
};

export { NewUser };
