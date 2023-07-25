import { useContext, useRef } from "react";
import { ErrorrCreationOptions, StyleData } from "../types/types";
import ErrorrContext from "../contexts/ErrorrContext.contectCreatior";
import useEffectOnce from "../hooks/useEffectOnce";

interface Props {
  content?: string;
  children?: JSX.Element | JSX.Element[];
  styleData?: StyleData;
  options?: ErrorrCreationOptions;
  name: string;
}

const Errorr = ({ content, name, styleData, options, children }: Props) => {
  const { loadErrorr } = useContext(ErrorrContext);
  const errorRef = useRef<HTMLDivElement>(null);

  const activate = () => {};

  useEffectOnce(() => {
    loadErrorr({ name, options, ref: errorRef, activate });
  });
};

export default Errorr;
