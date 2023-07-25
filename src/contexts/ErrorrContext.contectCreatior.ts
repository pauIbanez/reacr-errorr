import { createContext } from "react";
import { ErrorrContextData } from "../types/types";

const defaultValues: ErrorrContextData = {};

const ErrorrContext = createContext<ErrorrContextData>(defaultValues);
ErrorrContext.displayName = "Errorr context";

export default ErrorrContext;
