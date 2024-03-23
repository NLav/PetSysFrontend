import { zodResolver } from "@hookform/resolvers/zod";
import { PawPrint } from "@phosphor-icons/react";
import { Button, Input } from "components";
import { ToastContext } from "contexts";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthService, LocalStorageService } from "services";
import { generateId } from "utils";
import { z } from "zod";
import * as S from "./Login.styles";

const loginSchema = z.object({
  email: z.string().min(1, "Campo Obrigatório!").email("E-mail inválido!"),
  password: z.string().min(1, "Campo Obrigatório!"),
});

type loginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { addToast } = useContext(ToastContext);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: loginFormData) => {
    AuthService.signIn(data)
      .then((response) => {
        LocalStorageService.setAccessToken(response.data.access_token);

        navigate(`/pets`);
      })
      .catch((error) => {
        addToast({
          id: generateId(),
          variant: "danger",
          title: "Erro ao fazer login",
          description: error.message,
        });
      });
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
