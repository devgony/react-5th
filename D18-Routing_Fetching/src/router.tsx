import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Detail from "./screens/Detail";
import Home from "./screens/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
