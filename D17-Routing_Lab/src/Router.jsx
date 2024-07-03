import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import About from "./screens/About";
import Home from "./screens/Home";
import AuthorDetail from "./screens/AuthorDetail";
import BookDetail from "./screens/BookDetail";
import BookChapters from "./screens/BookChapters";
import BookCharacters from "./screens/BookCharacters";

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
        path: "about",
        element: <About />,
      },
      {
        path: "author/:name",
        element: <AuthorDetail />,
        children: [
          {
            path: ":book",
            element: <BookDetail />,
            children: [
              {
                path: "chapters",
                element: <BookChapters />,
              },
              {
                path: "characters",
                element: <BookCharacters />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
export default router;
