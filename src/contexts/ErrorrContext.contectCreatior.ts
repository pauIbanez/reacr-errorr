import { createContext } from "react";
import { ErrorrContextData } from "../types/types";

const defaultValues: ErrorrContextData = {
  errorrs: [],
  loadErrorr: () => null,
  activateErrorr: () => null,
};

const ErrorrContext = createContext<ErrorrContextData>(defaultValues);
ErrorrContext.displayName = "Errorr context";

export default ErrorrContext;
