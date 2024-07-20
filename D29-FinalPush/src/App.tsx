import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyle from "./global-style";
import styled from "styled-components";

const Main = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Header />
        <Outlet />
      </Main>
    </>
  );
}
