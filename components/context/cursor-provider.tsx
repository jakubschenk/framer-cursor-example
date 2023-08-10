"use client";

import React, {
  PropsWithChildren,
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEventListener, useMediaQuery } from "usehooks-ts";

const variants = {
  hidden: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  default: {
    width: 14,
    height: 14,
    opacity: 1,
  },
  withText: {
    width: 96,
    height: 96,
    opacity: 0.9,
  },
};

type Variants = keyof typeof variants;

type CursorStateType = {
  content?: ReactNode;
  variant: Variants;
  bgColor?: string;
  color?: string;
};

type AccentedColorType = {
  accentColor?: string;
};

type CursorContextState = {
  setCursor: (value: CursorStateType) => void;
  resetCursor: () => void;
} & AccentedColorType;

const initialCursorContextState = {
  setCursor: () => null,
  resetCursor: () => null,
  accentColor: undefined,
};

const CursorContext = createContext<CursorContextState>(
  initialCursorContextState
);

const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({
  children,
  accentColor = "#FFFFFF",
}: PropsWithChildren<AccentedColorType>) => {
  const defaultCursorState: CursorStateType = {
    content: undefined,
    variant: "default", // Hide initially to have a smooth transition on page load.
    bgColor: accentColor,
    color: undefined,
  };

  const [cursorState, setCursorState] =
    useState<CursorStateType>(defaultCursorState);

  const variantRef = useRef<CursorStateType["variant"]>("hidden");
  useEffect(() => {
    variantRef.current = cursorState.variant;
  }, [cursorState]);

  const documentRef = useRef<Document>(
    typeof document === "undefined" ? null : document
  );

  const [isHidden, setIsHidden] = useState(true);

  const isMouse = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [showCursor, setShowCursor] = useState(false); // Window undefined fix for pages directory SSG rendering
  useEffect(() => {
    setShowCursor(isMouse);
  }, [showCursor]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 500 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const mouseMoved = (e: MouseEvent) => {
    const sizeX = variants[variantRef.current].width / 2;
    const sizeY = variants[variantRef.current].height / 2;

    x.set(e.clientX - sizeX);
    y.set(e.clientY - sizeY);

    // For clean transition when switching from hidden
    setTimeout(() => {
      setIsHidden(false);
    }, 100);
  };

  const enter = (e: MouseEvent) => {
    const sizeX = variants[variantRef.current].width / 2;
    const sizeY = variants[variantRef.current].height / 2;

    // Override the spring entry point when mouse enters the document
    xSpring.set(e.clientX - sizeX);
    ySpring.set(e.clientY - sizeY);
  };

  const hide = () => {
    setTimeout(() => {
      setIsHidden(true);
    }, 100);
  };

  useEventListener("mousemove", mouseMoved);
  useEventListener("mouseenter", enter, documentRef);
  useEventListener("mouseleave", hide, documentRef);

  const setCursor = (state: CursorStateType) => {
    setCursorState({ ...cursorState, ...state });
  };

  const resetCursor = () => {
    setCursorState(defaultCursorState);
  };

  return (
    <CursorContext.Provider value={{ setCursor, resetCursor, accentColor }}>
      {showCursor && (
        <motion.div
          className="pointer-events-none fixed flex items-center justify-center rounded-full p-2 text-center text-lg font-normal leading-5 text-black"
          initial="hidden"
          variants={variants}
          animate={isHidden ? "hidden" : cursorState.variant}
          style={{
            zIndex: 2147483647,
            x: xSpring,
            y: ySpring,
            color: cursorState.color,
            backgroundColor: cursorState.bgColor,
          }}
        >
          {cursorState.content}
        </motion.div>
      )}
      {children}
    </CursorContext.Provider>
  );
};

export default useCursor;
