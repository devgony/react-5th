import styled from "styled-components";

export const H1 = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  padding: 0;
`;

export const Avatar = styled.div<{ imageUrl: string }>`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  border-radius: 50%;
`;
