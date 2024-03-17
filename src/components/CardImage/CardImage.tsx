import { CameraSlash } from "@phosphor-icons/react";
import "./CardImage.scss";

interface ICardImageProps {
  imageUrl?: string;
  alt: string;
}

const CardImage = ({ imageUrl, alt }: ICardImageProps) => {
  return (
    <div className="card-image">
      {imageUrl ? (
        <img src={imageUrl} alt={alt} />
      ) : (
        <div className="card-image__no-image-container">
          <CameraSlash size={"50%"} /> Sem imagem
        </div>
      )}
    </div>
  );
};

export { CardImage };
