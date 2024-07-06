import { Outlet } from "react-router-dom";
import GlobalStyle from "./global-style";

export default function Root() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}
