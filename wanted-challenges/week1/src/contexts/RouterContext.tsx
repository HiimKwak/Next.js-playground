import { createContext } from "react";

interface RouterContextProps {
  location: string;
  // push: (path: string) => void;
}

export const RouterContext = createContext<RouterContextProps>({
  location: "",
});
