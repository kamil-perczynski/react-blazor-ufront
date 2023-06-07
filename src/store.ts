import { createStore } from "zustand";

export interface User {
  username: string;
  preferredLanguage: string;
  permissions: string[];
}

export interface State {
  boo: number;
  foo: string;
  user: User;
  setUsername: (nextUsername: string) => void;
  incrementBoo: () => void;
  decrementBoo: () => void;
}

export const store = createStore<State>((set) => ({
  boo: 123,
  foo: "abc",
  user: {
    username: "John Deryll Foe",
    preferredLanguage: "en",
    permissions: ["payments:list"],
  },

  incrementBoo: () => set((currentState) => ({ boo: currentState.boo + 1 })),
  decrementBoo: () => set((currentState) => ({ boo: currentState.boo - 1 })),

  setUsername: (nextUsername: string) =>
    set((currentState) => ({
      user: { ...currentState.user, username: nextUsername },
    })),
}));
