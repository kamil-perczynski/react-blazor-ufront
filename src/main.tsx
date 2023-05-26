import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store.ts";
import { DotnetHelper } from "./dotnet";

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
