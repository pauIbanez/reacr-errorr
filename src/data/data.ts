import { ErrorrOptions, ErrorrContextData } from "../types/types";

export const defaultErrorOptions: ErrorrOptions = {
  animation: {
    durationInMs: 200,
    type: "fadeOut",
  },
  offsets: {
    offsetY: 0,
    offsetX: 0,
  },
  positioning: {
    block: "after",
    inline: "start",
  },
  activeTime: 2000,
};

export const defaultValues: ErrorrContextData = {
  errorrs: [],
  loadErrorr: () => null,
  activateErrorr: () => null,
  getOptions: () => defaultErrorOptions,
};
