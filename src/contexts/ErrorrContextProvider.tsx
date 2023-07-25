import { useCallback, useState } from "react";
import {
  ErrorrOptions,
  ErrorrContextData,
  ErrorrContextOptions,
  ErrorrCreationData,
  ErrorrData,
  ErrorrCreationOptions,
} from "../types/types";
import ErrorrContext from "./ErrorrContext.contectCreatior";
import _ from "lodash";
import { defaultErrorOptions } from "../data/data";

interface Props {
  options?: ErrorrContextOptions;
  children: JSX.Element | JSX.Element[];
}

const ErrorrContextProvider = ({ children, options }: Props) => {
  const [errorrs, setErrorrs] = useState<ErrorrData[]>([]);

  const getOptions = (options: ErrorrCreationOptions): ErrorrOptions => {
    const defaultOptions: ErrorrOptions = JSON.parse(
      JSON.stringify(defaultErrorOptions)
    );

    return _.merge(defaultOptions, options);
  };

  const loadErrorr = (errorr: ErrorrCreationData) => {
    const newErrorr: ErrorrCreationData = JSON.parse(JSON.stringify(errorr));
    newErrorr.options = getOptions(newErrorr.options || {});

    setErrorrs((prevErrorrs) => [...prevErrorrs, newErrorr as ErrorrData]);
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
    getOptions,
  };

  return (
    <ErrorrContext.Provider value={contextValue}>
      {children}
    </ErrorrContext.Provider>
  );
};

export default ErrorrContextProvider;
