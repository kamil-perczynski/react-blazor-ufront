import React from "react";
import { useStore } from "zustand";
import { store } from "./store";
import { shallow } from "zustand/shallow";
import { Link } from "react-router-dom";

export const UsernameInput: React.FC = React.memo(() => {
  const [username, setUsername] = useStore(
    store,
    (state) => [state.user.username, state.setUsername],
    shallow
  );

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size={40}
        style={{ padding: 15 }}
      />

      <br />
      <br />

      <Link to="/counter">Go to Counter</Link>
    </div>
  );
});
