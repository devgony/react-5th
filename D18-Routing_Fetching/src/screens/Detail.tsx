import { useEffect, useState } from "react";
import { CharacterDetail, getCharacterDetail } from "../service";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Avatar, H1 } from "../common-style";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  width: 30%;
  place-items: center;
`;

const Film = styled.div`
  color: black;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export default function Detail() {
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState<CharacterDetail>();
  if (!id) {
    return <div>Invalid ID</div>;
  }

  useEffect(() => {
    getCharacterDetail(id).then((characterDetail) =>
      setCharacterDetail(characterDetail)
    );
  }, []);

  if (!characterDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <Avatar imageUrl={characterDetail.imageUrl} />
      <H1>{characterDetail.name}</H1>
      <Grid>
        {characterDetail.films.map((film) => (
          <Film>{film}</Film>
        ))}
      </Grid>
    </Main>
  );
}
