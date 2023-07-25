import { useContext, useRef, useState } from "react";
import { ErrorrCreationOptions, StyleData } from "../types/types";
import ErrorrContext from "../contexts/ErrorrContext.contectCreatior";
import useEffectOnce from "../hooks/useEffectOnce";
import styled from "styled-components";

interface Props {
  message?: string;
  content?: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
  styleData?: StyleData;
  options?: ErrorrCreationOptions;
  name: string;
}

const Holder = styled.div<{ show: boolean }>`
  opacity: ${(props) => (props.show ? "1" : "0")};
  ${(props) => (props.show ? "" : "transition: all ease-in 200ms;")}
  position: relative;
  z-index: -1;
`;

const Content = styled.div`
  height: 50px;
  width: 200px;
  background-color: blue;
  color: red;
  position: absolute;
  left: 0;
  top: 0;
`;

const Errorr = ({
  message,
  content,
  name,
  styleData,
  options,
  children,
}: Props) => {
  const { loadErrorr } = useContext(ErrorrContext);

  const timerRef = useRef<{ value: NodeJS.Timeout | null }>({ value: null });
  const contentRef = useRef<HTMLDivElement>(null);

  const [isShowing, setIsShowing] = useState(false);

  const activate = () => {
    if (timerRef.current.value) {
      clearTimeout(timerRef.current.value);
    }

    setIsShowing(true);

    timerRef.current.value = setTimeout(() => {
      setIsShowing(false);
    }, 2000);
  };

  useEffectOnce(() => {
    loadErrorr({
      name,
      options,
      activate: () => {
        activate();
      },
    });
  });

  return (
    <>
      <Holder show={isShowing}>
        <Content ref={contentRef}>
          {content ? content : message ? message : "Default message"}
        </Content>
      </Holder>
      {children}
    </>
  );
};

export default Errorr;
