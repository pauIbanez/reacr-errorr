export type Positioning = "before" | "start" | "centered" | "end" | "after";
export type Animation =
  | "fadeIn"
  | "fadeOut"
  | "fadeInOut"
  | "instant"
  | "centered";

export interface ErrorrCreationData {
  name: string;
  options?: ErrorrCreationOptions;
  activate(): void;
}

export interface ErrorrData {
  name: string;
  options: ErrorrOptions;
  activate(): void;
}

export interface ErrorrContextData {
  errorrs: ErrorrData[];
  loadErrorr(errorr: ErrorrCreationData): void;
  activateErrorr(name: string): void;
  getOptions(options: ErrorrCreationOptions): ErrorrOptions;
}

export interface ErrorrContextOptions {
  errorrOptions?: ErrorrCreationOptions;
  debug?: boolean;
}

export interface ErrorrCreationOptions {
  /**
   * The offset X and Y for the positioning of the pop-up errorr. This offset is applied to the base position.
   */
  offsets?: {
    offsetX?: number;
    offsetY?: number;
  };
  /**
   * The positioning (before offset) of the pop-up relative to the content
   * @param block - Verical position  | Default "after"
   * @param inline - Horizontal position | Default "start"
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
  /**
   * This option eliminates the error disaperance, allowing you to design it in position.
   * This does not update on runtime, refresh the page after setting this to true
   */
  debug?: boolean;
}

export interface ErrorrOptions {
  offsets: {
    offsetX: number;
    offsetY: number;
  };
  positioning: {
    block: Positioning;
    inline: Positioning;
  };
  animation: {
    type: Animation;
    durationInMs: number;
  };
}

export interface StyleData {
  height?: number | string;
  width?: number | string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number;
}
