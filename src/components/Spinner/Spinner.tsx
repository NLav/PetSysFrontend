import { CircleNotch } from "@phosphor-icons/react";
import * as S from "./Spinner.styles";

const Spinner = () => {
  return (
    <S.Container className="spinner">
      <CircleNotch size={"20%"} />
    </S.Container>
  );
};

export { Spinner };
