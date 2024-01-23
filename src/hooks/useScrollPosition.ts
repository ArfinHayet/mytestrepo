import {
  RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";

export function useScrollPosition(
  element: RefObject<HTMLElement>,
  wait: number = 0
) {
  const [position, setPosition] = useState(0);
  const [height,setHeight] = useState(0) 
  let throttleTimeout: NodeJS.Timeout | null = null;

  const callBack = useCallback(() => {
    setPosition(element.current.scrollTop);
    setHeight(element.current.scrollHeight)
    throttleTimeout = null;
  }, [element]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };
    element.current.addEventListener("scroll", handleScroll);
    return () => element.current.removeEventListener("scroll", handleScroll);
  }, [callBack, element]);

  return [ position, height ];
}
