import { createContext } from "react";
import { ErrorrContextData } from "../types/types";
import { defaultValues } from "../data/data";

const ErrorrContext = createContext<ErrorrContextData>(defaultValues);
ErrorrContext.displayName = "Errorr context";

export default ErrorrContext;
