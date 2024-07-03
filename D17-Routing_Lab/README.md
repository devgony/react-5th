# 4 REACT ROUTER V6

## 4.0 Update Introduction

- lecture: 6.4.2, mine: 6.24.0

## 4.1 BrowserRouter

- BrowserRouter (legacy)

```js
function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}>
                <Route path="/about" element={<About />}>
            </Routes>
        </BrowserRouter>
    )
}
```

## 4.2 createBrowserRouter

- can nest children
- replace `<Outlet />` with child

```js
// src/Router.jsx
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
    ],
  },
]);
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
    ],
  },
]);
```

```js
// src/Root.jsx
export default function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
```

## 4.3 errorElement

- url is wrong, runtime crashed => go to errorElement

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      ..
    ],
    errorElement: <NotFound />,
  },
]);
```

## 4.4 useNavigate

- Link vs useNavigate

```js
const navigate = useNavigate();
const onAboutClick = () => {
  navigate("/about");
};
```

## 4.5 useParams

```js
const router = createBrowserRouter([
    ..
      {
        path: "users/:userId",
        element: <User />,
      },
```

```js
const { userId } = useParams();
```

## 4.6 Outlet

-

## 4.7 useOutletContext

- communicate with children route
- all descendent can take the context
- useful to send theme

```js
<Outlet context={{ darkMode: true }} />
```

```js
const { darkMode } = useOutletContext();
```

## 4.8 Extras

- useSearchParams()

```js
const [readSearchParms, setSearchParams] = useSearchParams();
console.log(readSearchParms.get("geo"));
setTimeout(() => {
  setSearchParams({
    day: "today",
    tomorrow: "123",
  });
}, 3000);
```

- useLoaderData()
- put data with `loader` in router
- `Form` can exeucte server action
