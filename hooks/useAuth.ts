import { RootState } from "../store";
import { useAppSelector } from "./redux.hooks";

const useIsAuthorized = () => {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.user);
  const isAuthorized = (): boolean => {
    if (!isLoggedIn) return false;
    return true;
  };
  return isAuthorized();
};

export default useIsAuthorized;
