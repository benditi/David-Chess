import { createContext, useContext } from "react";

import { ContextUser } from "~/routes/context-form";

type ContextType = {
  user: ContextUser;
  setUser: React.Dispatch<React.SetStateAction<ContextUser>>;
};
type UserKey = keyof ContextUser;
export const AppContext = createContext<ContextType | undefined>(undefined);

export const useUserConext = () => {
  let context = useContext(AppContext);
  if (!context) {
    // return null;
    throw Error("Did not initiate content");
  }
  let { user, setUser } = context;
  let setUserProperty = (name: UserKey, value: string) =>
    setUser((prevSate) => ({ ...prevSate, [name]: value }));
  return { user, setData: setUserProperty };
};
