import { createContext, useContext } from "react";
import { ContextUser } from "~/routes/context-form";

type ContextType = {
  user: ContextUser;
  setUser: (values: ContextUser) => void;
};
type meo = keyof ContextUser;
export const AppContext = createContext<ContextType | undefined>(undefined);

export const useUserConext = () => {
  let context = useContext(AppContext);
  if (!context) {
    // return null;
    throw Error("Did not initiate content");
  }
  let { user, setUser } = context;

  return context;
};
