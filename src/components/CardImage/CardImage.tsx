import { CameraSlash } from "@phosphor-icons/react";
import * as S from "./CardImage.styles";

interface ICardImageProps {
  imageUrl?: string;
  alt: string;
}

const CardImage = ({ imageUrl, alt }: ICardImageProps) => {
  return (
    <S.Container>
      {imageUrl ? (
        <S.Image src={imageUrl} alt={alt} />
      ) : (
        <S.NoImageContainer>
          <CameraSlash size={"50%"} /> Sem imagem
        </S.NoImageContainer>
      )}
    </S.Container>
  );
};

export { CardImage };
