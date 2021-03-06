import { useState, useEffect } from "react";
import { useStore } from "../store";
import { lpColor, rgbToHsv } from "../utils";
import { Mapping } from "../store/MappingStore";
import { autorun } from "mobx";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const usePadState = (page: number, index: number, preview?: boolean) => {
  const store = useStore();

  const [val, setVal] = useState<any>({});

  useEffect(
    () =>
      autorun(() => {
        let mapping: Mapping | undefined =
          store.mappings.mappings[page]?.[index];

        setVal({
          color: lpColor(mapping?.color || [0, 0]),
          opacity: mapping?.color
            ? rgbToHsv([
                (240 * mapping?.color![0]) / 3,
                (240 * mapping?.color![1]) / 3,
                0,
              ])[2]
            : 0,
        });

        if (preview) return;

        if (mapping?.color)
          store.launchpads.currentLaunchpad?.output.playNote(index, 1, {
            rawVelocity: true,
            velocity: 0x10 * mapping.color[1] + mapping.color[0] + 0x0c,
          });
        else
          store.launchpads.currentLaunchpad?.output.playNote(index, 1, {
            rawVelocity: true,
            velocity: 0x0c,
          });
      }),

    //eslint-disable-next-line
    [page, index, preview]
  );

  return val;
};
