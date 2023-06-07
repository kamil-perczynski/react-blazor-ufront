import React from "react";
import { useStore } from "zustand";
import { store } from "./store";
import { shallow } from "zustand/shallow";
import { Link } from "react-router-dom";

export const Counter: React.FC = React.memo(() => {
  const [boo, incrementBoo, decrementBoo] = useStore(
    store,
    (state) => [state.boo, state.incrementBoo, state.decrementBoo],
    shallow
  );

  return (
    <div>
      <div>
        <button onClick={decrementBoo}>-</button>
        &nbsp; &nbsp;
        <span>Counter is: {boo}</span>
        &nbsp; &nbsp;
        <button onClick={incrementBoo}>+</button>
      </div>
      <br />
      <div>
        <Link to="/fetchdata">Go to FetchData</Link>
      </div>
    </div>
  );
});
