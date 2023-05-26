import "./App.css";
import { UsernameInput } from "./UsernameInput";
import { RouterProvider } from "react-router";
import { Counter } from "./Counter";
import { createBrowserRouter } from "react-router-dom";
import { Parcel } from "./Parcel";
import { DotnetHelper } from "./dotnet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Counter />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetchdata",
    element: <UsernameInput />,
  },
]);

Object.defineProperty(window, "blazorNavigationChanged", {
  value: (url: string) => {
    router.navigate(url.replace(window.location.origin, ""), {
      replace: true,
    });
  },
});

function App() {
  return (
    <div className="app">
      <div className="side-view">
        <RouterProvider router={router} />
      </div>

      <Parcel
        url="/ufronts/blazor/_framework/blazor.webassembly.js"
        router={router}
        stylesheets={[
          "css/bootstrap/bootstrap.min.css",
          "css/app.css",
          "blazor-ufront.styles.css",
        ]}
      />
    </div>
  );
}

export default App;
