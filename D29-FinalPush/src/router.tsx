import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import ComingSoon from "./screens/ComingSoon";
import NowPlaying from "./screens/NowPlaying";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movies/:movieId",
        element: <Home />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "coming-soon/:movieId",
        element: <ComingSoon />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
      {
        path: "now-playing/:movieId",
        element: <NowPlaying />,
      },
    ],
  },
]);
