import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DotnetHelper } from "./dotnet";
import { store } from "./store";
import "./index.css";

Object.defineProperty(window, "store", { value: store });

Object.defineProperty(window, "subscribe", {
  value: (dotnetHelper: DotnetHelper) => {
    store.subscribe((nextState, prevState) => {
      dotnetHelper.invokeMethodAsync(
        "OnStoreStateChanged",
        nextState,
        prevState
      );
    });
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
