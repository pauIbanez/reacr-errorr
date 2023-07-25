import { ErrorrOptions, StyleData } from "../types/types";

interface Props {
  content?: string;
  children?: JSX.Element | JSX.Element[];
  styleData?: StyleData;
  options?: ErrorrOptions;
  name: string;
}

const Errorr = ({ content, name, styleData, options, children }: Props) => {};

export default Errorr;
