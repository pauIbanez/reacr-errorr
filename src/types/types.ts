import { RefObject } from "react";

export type Positioning = "start" | "center" | "end";
export type Animation = "fadeIn" | "fadeOut" | "fadeInOut" | "instant";

export interface ErrorrContextData {
  errors: ErrorrData[];
}

export interface ErrorrData {
  name: string;
  options?: ErrorrOptions;
  activate(): void;
  ref: RefObject<HTMLDivElement>;
}

export interface ErrorrOptions {
  /**
   * The offset X and Y for the positioning of the pop-up errorr. This offset is applied to the base position
   */
  offsets?: {
    offsetX?: number;
    offsetY?: number;
  };
  /**
   * The base positioning relative to the parent component
   * @param block - Verical base position | Default "end"
   * @param inline - Horizontal base position | Default "start"
   */
  positioning?: {
    block?: Positioning;
    inline?: Positioning;
  };
  /**
   * The type and duration of the pop-up animation.
   * @param type - Default "fadeOut"
   * @param durationInMs - Default "200"
   */
  animation?: {
    type?: Animation;
    durationInMs?: number;
  };
}

export interface StyleData {
  height?: number | string;
  width?: number | string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
}
