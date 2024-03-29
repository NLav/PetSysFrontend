import * as S from "./NoItemsContainer.styles";

interface INoItemsContainerProps {
  text: string;
}

const NoItemsContainer = ({ text }: INoItemsContainerProps) => {
  return <S.Container>{text}</S.Container>;
};

export { NoItemsContainer };
