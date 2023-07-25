import { ErrorrContextData } from "../types/types";
import ErrorrContext from "./ErrorrContext.contectCreatior";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ErrorrContextProvider = ({ children }: Props) => {
  const contextValue: ErrorrContextData = {};

  return (
    <ErrorrContext.Provider value={contextValue}>
      {children}
    </ErrorrContext.Provider>
  );
};

export default ErrorrContextProvider;
