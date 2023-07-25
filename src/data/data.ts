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
    block: "end",
    inline: "start",
  },
};

export const defaultValues: ErrorrContextData = {
  errorrs: [],
  loadErrorr: () => null,
  activateErrorr: () => null,
  getOptions: () => defaultErrorOptions,
};
