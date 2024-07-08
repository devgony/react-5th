import styled from "styled-components";
import { countriesState, Status } from "../atoms";
import { useRecoilState } from "recoil";
import { CategoryNode } from "../category";

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface Props {
  name: string;
  status: CategoryNode;
}
export default function CountryItem({ name, status }: Props) {
  const [countries, setCountries] = useRecoilState(countriesState);

  return (
    <Item key={name}>
      <span>{name}</span>

      {status.currentCategory().next && (
        <button
          type="button"
          onClick={() => status.moveNext(name, countries, setCountries)}
        >
          {status.currentCategory().next?.icon}
        </button>
      )}
      <button
        type="button"
        onClick={() => status.movePrev(name, countries, setCountries)}
      >
        {status.currentCategory().prev?.icon}
      </button>
    </Item>
  );
}
