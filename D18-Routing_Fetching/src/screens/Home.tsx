import { useEffect, useState } from "react";
import { Character, getCharacters } from "../service";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Avatar, H1 } from "../common-style";

const Main = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 4rem;
  width: 100%;
  place-items: stretch;
  padding-left: 4rem;
  padding-right: 4rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 1rem;
  border-radius: 10px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    color: black;
  }
`;

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>();

  useEffect(() => {
    getCharacters().then((characters) => setCharacters(characters));
  }, []);

  const navigate = useNavigate();

  if (characters === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <H1>Disney Characters</H1>
      <Grid>
        {characters.map((c) => (
          <Item key={c.id} onClick={() => navigate(`/detail/${c.id}`)}>
            <Avatar imageUrl={c.imageUrl} />
            <p>{c.name}</p>
          </Item>
        ))}
      </Grid>
    </Main>
  );
}
