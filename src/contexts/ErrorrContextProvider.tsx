import { useCallback, useRef } from "react";
import {
  ErrorrOptions,
  ErrorrContextData,
  ErrorrCreationData,
  ErrorrData,
  ErrorrCreationOptions,
} from "../types/types";
import ErrorrContext from "./ErrorrContext.contectCreatior";
import _ from "lodash";
import { defaultErrorOptions } from "../data/data";

interface Props {
  options?: ErrorrCreationOptions;
  children: JSX.Element | JSX.Element[];
}

const ErrorrContextProvider = ({ children, options }: Props) => {
  const errorrs = useRef<ErrorrData[]>([]);

  const getOptions = (errorrOptions: ErrorrCreationOptions): ErrorrOptions => {
    const defaultOptions: ErrorrOptions = JSON.parse(
      JSON.stringify(defaultErrorOptions)
    );

    const baseOptions: ErrorrOptions = _.merge(defaultOptions, options || {});

    return _.merge(baseOptions, errorrOptions || {});
  };

  const loadErrorr = (errorr: ErrorrCreationData) => {
    errorr.options = getOptions(errorr.options || {});
    errorrs.current = [...errorrs.current, errorr as ErrorrData];
  };

  const updateErrorr = (errorr: ErrorrCreationData) => {
    errorr.options = getOptions(errorr.options || {});

    errorrs.current = errorrs.current.map((stateErrorr) =>
      stateErrorr.name === errorr.name ? (errorr as ErrorrData) : stateErrorr
    );
  };

  const forceRemoveErrorr = useCallback(
    (name: string) => {
      const foundErrorr = errorrs.current.find(
        (errorr) => errorr.name === name
      );
      if (!foundErrorr) {
        if (options?.debug) console.error(`Errorr not found for name: ${name}`);
        return;
      }

      foundErrorr.forceRemove();

      errorrs.current = errorrs.current.map((errorr) => {
        if (errorr.name === name) {
          errorr.isActive = false;
        }
        return errorr;
      });
    },
    [options?.debug]
  );

  const activateErrorr = useCallback(
    (name: string) => {
      const foundErrorr = errorrs.current.find(
        (errorr) => errorr.name === name
      );
      if (!foundErrorr) {
        if (options?.debug) console.error(`Errorr not found for name: ${name}`);
        return;
      }

      foundErrorr.activate();

      errorrs.current = errorrs.current.map((errorr) => {
        if (errorr.name === name) {
          errorr.isActive = true;
        }
        return errorr;
      });

      setTimeout(() => {
        errorrs.current = errorrs.current.map((errorr) => {
          if (errorr.name === name) {
            errorr.isActive = false;
          }
          return errorr;
        });
      }, foundErrorr.options.activeTime);
    },
    [options?.debug]
  );

  const contextValue: ErrorrContextData = {
    errorrs: errorrs.current,
    loadErrorr,
    updateErrorr,
    activateErrorr,
    forceRemoveErrorr,
    getOptions,
  };

  return (
    <ErrorrContext.Provider value={contextValue}>
      {children}
    </ErrorrContext.Provider>
  );
};

export default ErrorrContextProvider;
