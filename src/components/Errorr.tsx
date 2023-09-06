import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  ErrorrCreationOptions,
  ErrorrOptions,
  StyleData,
} from "../types/types";
import ErrorrContext from "../contexts/ErrorrContext.contectCreatior";
import useEffectOnce from "../hooks/useEffectOnce";
import styled from "styled-components";

const Holder = styled.div`
  width: 100%;
  position: relative;
`;

const Content = styled.div<{
  top: number;
  left: number;
  animation: string;
}>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  pointer-events: none;
  opacity: 0;
  z-index: 10;
  ${(props) => "animation: " + props.animation + "ms forwards" ?? ""};

  @keyframes out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const DefaultErrorHolder = styled.div`
  position: relative;
`;

const DefaultErrorContainer = styled.div<{ styleData?: StyleData }>`
  padding: 10px 30px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.2), -6px -6px 25px rgba(0, 0, 0, 0.2);
  height: ${(props) =>
    props.styleData?.height
      ? typeof props.styleData?.height === "string"
        ? props.styleData?.height
        : props.styleData?.height + "px"
      : "fit-content"};

  width: ${(props) =>
    props.styleData?.width
      ? typeof props.styleData?.width === "string"
        ? props.styleData?.width
        : props.styleData?.width + "px"
      : "fit-content"};
`;

const Shape = styled.div<{
  top: number;
  left: number;
  rotation: number;
}>`
  position: absolute;
  width: 0;
  height: 0;

  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;

  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;

  transform: rotate(${(props) => props.rotation}deg);
`;

const DefaultErrorMessage = styled.p<{ styleData?: StyleData }>`
  font-size: ${(props) =>
    props.styleData?.fontSize
      ? typeof props.styleData?.fontSize === "string"
        ? props.styleData?.fontSize
        : props.styleData?.fontSize + "px"
      : "14px"};
  color: ${(props) => props.styleData?.color ?? "red"};

  font-weight: ${(props) => props.styleData?.fontWeight ?? "500"};
  white-space: nowrap;
  margin: 0;
`;
interface Props {
  /**
   * The name of the error, this name is used to show the error with the ErrorrContextProvider
   */
  name: string;
  /**
   * (Optional) The error message
   */
  message?: string;
  /**
   * (Optional | Overrides message) The JSX component to render as the error
   */
  content?: JSX.Element | JSX.Element[];
  /**
   * (Optional) Some style options for the default error container
   */
  styleData?: StyleData;
  /**
   * (Optional) - The options of this error in particular, overriding the contex's ErrorrOptions for just this one error
   */
  options?: ErrorrCreationOptions;
  /**
   * The children JSX component, from which the Errorr is positioned
   */
  children: JSX.Element | JSX.Element[];
}

const Errorr = ({
  name,
  message,
  content,
  styleData,
  options,
  children,
}: Props) => {
  const { loadErrorr, getOptions, updateErrorr } = useContext(ErrorrContext);

  const timerRef = useRef<{ value: NodeJS.Timeout | null }>({ value: null });
  const errorHolderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isShowing, setIsShowing] = useState(false);
  const [hasBeenShowed, setHasBeenShowed] = useState(false);
  const [dimention, setDimention] = useState<{ height: number; width: number }>(
    { height: 10, width: 10 }
  );
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  }>({
    left: 0,
    top: 0,
  });

  const [fullOptions, setFullOptions] = useState<ErrorrOptions | null>(null);
  const [shapePosition, setShapePosition] = useState<{
    top: number;
    left: number;
    rotation: number;
  }>({
    top: -10,
    left: 20,
    rotation: 0,
  });

  const [animation, setAnimation] = useState<string>("");

  const activate = useCallback(() => {
    if (timerRef.current.value) {
      clearTimeout(timerRef.current.value);
    }

    setIsShowing(true);
    if (!options?.debug) {
      timerRef.current.value = setTimeout(() => {
        setIsShowing(false);
      }, fullOptions?.activeTime);
    }
  }, [options?.debug, fullOptions?.activeTime]);

  const forceRemove = useCallback(() => {
    if (timerRef.current.value) {
      clearTimeout(timerRef.current.value);
    }
    setIsShowing(false);
  }, []);

  useEffect(() => {
    const duration = fullOptions?.animation.durationInMs ?? 200;

    switch (fullOptions?.animation.type) {
      case "fadeIn":
        setAnimation(isShowing ? `in ${duration}` : "");
        break;

      case "fadeOut":
        setAnimation(
          hasBeenShowed ? (!isShowing ? `out ${duration}` : "in 1") : ""
        );
        break;

      case "fadeInOut":
        setAnimation(
          hasBeenShowed
            ? isShowing
              ? `in ${duration}`
              : `out ${duration}`
            : ""
        );
        break;

      case "instant":
        setAnimation(isShowing ? `in 1` : "");
        break;
    }
  }, [
    fullOptions?.animation.durationInMs,
    fullOptions?.animation.type,
    isShowing,
    hasBeenShowed,
  ]);

  useEffectOnce(() => {
    loadErrorr({
      name,
      options,
      activate,
      forceRemove,
    });
  });

  useEffect(() => {
    updateErrorr({
      name,
      options,
      activate,
      forceRemove,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activate, name]);

  useEffect(() => {
    setFullOptions(getOptions(options || {}));
  }, [getOptions, options]);

  useEffect(() => {
    setDimention({
      height: errorHolderRef.current?.clientHeight || 10,
      width: errorHolderRef.current?.clientWidth || 10,
    });
  }, [
    errorHolderRef.current?.clientWidth,
    errorHolderRef.current?.clientHeight,
  ]);

  useEffect(() => {
    if (isShowing && !hasBeenShowed) {
      setHasBeenShowed(true);
    }
  }, [isShowing, hasBeenShowed]);

  useEffect(() => {
    let baseTop = 0;
    let top = 0;

    let baseLeft = 0;
    let left = 0;

    let shapeTop = -10;
    let shapeLeft = 20;
    let shapeRot = 0;

    switch (fullOptions?.positioning.block) {
      case "before":
        baseTop =
          -(contentRef.current?.clientHeight ?? 10) - (content ? 0 : 15);
        shapeRot = 180;
        shapeTop = contentRef.current?.clientHeight ?? 10;
        break;

      case "start":
        baseTop = 0;
        shapeTop = dimention.height / 2 + 3;
        break;

      case "end":
        baseTop = dimention.height - (contentRef.current?.clientHeight ?? 10);
        break;

      case "center":
        baseTop =
          dimention.height / 2 - (contentRef.current?.clientHeight ?? 10) / 2;
        break;

      case "centered":
        baseTop =
          dimention.height / 2 - (contentRef.current?.clientHeight ?? 10) / 2;
        break;

      case "after":
        baseTop = dimention.height + (content ? 0 : 15);
        break;
    }

    switch (fullOptions?.positioning.inline) {
      case "before":
        baseLeft =
          -(contentRef.current?.clientWidth ?? 10) - (content ? 0 : 15);
        shapeLeft = (contentRef.current?.clientWidth ?? 10) - 5;
        shapeTop = (contentRef.current?.clientHeight ?? 10) / 2 - 5;
        shapeRot = 90;
        break;

      case "start":
        baseLeft = 0;
        break;

      case "center":
        baseLeft = dimention.width / 2 - 30;
        shapeLeft = 20;
        break;

      case "centered":
        baseLeft =
          dimention.width / 2 - (contentRef.current?.clientWidth ?? 10) / 2;
        shapeLeft = (contentRef.current?.clientWidth ?? 10) / 2 - 10;
        break;

      case "end":
        baseLeft = dimention.width - (contentRef.current?.clientWidth ?? 10);
        shapeLeft = (contentRef.current?.clientWidth ?? 10) - 40;
        break;

      case "after":
        baseLeft = dimention.width + (content ? 0 : 15);
        shapeLeft = -15;
        shapeTop = (contentRef.current?.clientHeight ?? 10) / 2 - 5;
        shapeRot = -90;
        break;
    }

    top = baseTop + (fullOptions?.offsets.offsetY ?? 0);
    left = baseLeft + (fullOptions?.offsets.offsetX ?? 0);

    setPosition({
      top,
      left,
    });

    setShapePosition({
      top: shapeTop,
      left: shapeLeft,
      rotation: shapeRot,
    });
  }, [
    dimention,
    fullOptions,
    contentRef.current?.clientWidth,
    contentRef.current?.clientHeight,
    content,
  ]);

  return (
    <Holder ref={errorHolderRef}>
      <Content
        top={position.top}
        left={position.left}
        ref={contentRef}
        animation={animation}
      >
        {content ? (
          content
        ) : (
          <div style={{ position: "relative" }}>
            <DefaultErrorHolder>
              <DefaultErrorContainer styleData={styleData}>
                <DefaultErrorMessage styleData={styleData}>
                  {message ? message : "Default message"}
                </DefaultErrorMessage>
                <Shape
                  top={shapePosition.top}
                  left={shapePosition.left}
                  rotation={shapePosition.rotation}
                />
              </DefaultErrorContainer>
            </DefaultErrorHolder>
          </div>
        )}
      </Content>
      {children}
    </Holder>
  );
};

export default Errorr;
