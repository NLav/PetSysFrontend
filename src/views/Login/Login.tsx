import { PawPrint } from "@phosphor-icons/react";
import { Button, Input } from "components";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import * as S from "./Login.styles";

const loginSchema = z.object({
  email: z.string().min(1, "Campo Obrigatório!").email(),
  password: z.string().min(1, "Campo Obrigatório!"),
});

type loginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({ defaultValues: { email: "", password: "" } });

  const onSubmit = (data: loginFormData) => {
    console.log(data);
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <S.LogoContainer>
        <PawPrint size={200} />
        PetSys
      </S.LogoContainer>

      <S.InputsContainer>
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
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              id="input-password"
              title="Senha"
              value={value}
              type="password"
              onChange={onChange}
              errorMessage={errors.password?.message}
              required={true}
            />
          )}
        />
      </S.InputsContainer>

      <S.ButtonContainer>
        <Button variant="secondary" type="submit">
          Entrar
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export { Login };
