import { useCallback, useState } from "react";
import {
  ErrorrContextData,
  ErrorrContextOptions,
  ErrorrData,
} from "../types/types";
import ErrorrContext from "./ErrorrContext.contectCreatior";

interface Props {
  options?: ErrorrContextOptions;
  children: JSX.Element | JSX.Element[];
}

const ErrorrContextProvider = ({ children, options }: Props) => {
  const [errorrs, setErrorrs] = useState<ErrorrData[]>([]);

  const loadErrorr = (errorr: ErrorrData) => {
    setErrorrs((prevErrorrs) => [...prevErrorrs, errorr]);
  };

  const activateErrorr = useCallback(
    (name: string) => {
      const foundErrorr = errorrs.find((errorr) => errorr.name === name);
      if (!foundErrorr) {
        if (options?.debug) console.error(`Errorr not found for name: ${name}`);
        return;
      }

      foundErrorr.activate();
    },
    [errorrs, options?.debug]
  );

  const contextValue: ErrorrContextData = {
    errorrs,
    loadErrorr,
    activateErrorr,
  };

  return (
    <ErrorrContext.Provider value={contextValue}>
      {children}
    </ErrorrContext.Provider>
  );
};

export default ErrorrContextProvider;
