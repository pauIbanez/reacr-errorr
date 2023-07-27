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
    errorr.options = getOptions(errorr.options || {});
    setErrorrs((prevErrorrs) => [...prevErrorrs, errorr as ErrorrData]);
  };

  const updateErrorr = (errorr: ErrorrCreationData) => {
    errorr.options = getOptions(errorr.options || {});
    setErrorrs((prevErrorrs) =>
      prevErrorrs.map((stateErrorr) =>
        stateErrorr.name === errorr.name ? (errorr as ErrorrData) : stateErrorr
      )
    );
  };
  const activateErrorr = useCallback(
    (name: string) => {
      const foundErrorr = errorrs.find((errorr) => errorr.name === name);
      if (!foundErrorr) {
        if (options?.debug) console.error(`Errorr not found for name: ${name}`);
        return;
      }

      foundErrorr.activate();

      setErrorrs((stateErrorrs) =>
        stateErrorrs.map((e) => {
          if (e.name === name) {
            e.isActive = true;
          }
          return e;
        })
      );

      setTimeout(() => {
        setErrorrs((stateErrorrs) =>
          stateErrorrs.map((e) => {
            if (e.name === name) {
              e.isActive = false;
            }
            return e;
          })
        );
      }, foundErrorr.options.activeTime);
    },
    [errorrs, options?.debug]
  );

  const contextValue: ErrorrContextData = {
    errorrs,
    loadErrorr,
    updateErrorr,
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
