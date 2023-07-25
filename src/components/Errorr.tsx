import { ErrorrOptions, StyleData } from "../types/types";

interface Props {
  content: string | JSX.Element | JSX.Element[];
  styleData?: StyleData;
  options?: ErrorrOptions;
  name: string;
}

const Errorr = ({ content, name, styleData, options }: Props) => {};

export default Errorr;
