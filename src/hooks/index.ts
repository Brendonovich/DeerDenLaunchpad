import { useState, useEffect } from "react";
import { useStore } from "../store";
import { lpColor, rgbToHsv } from "../utils";
import { Mapping } from "../store/MappingStore";
import { autorun } from "mobx";

function getWindowDimensions() {
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

export const usePadState = (page: number, index: number) => {
  const store = useStore();

  const [val, setVal] = useState<any>({});

  useEffect(() => {
    autorun(() => {
      let mapping: Mapping | undefined = store.mappings.mappings[page]?.[index];
      if (mapping === undefined) return;
      
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

      if (mapping.color)
        store.launchpads.currentLaunchpad?.output.playNote(index, "all", {
          rawVelocity: true,
          velocity: 0x10 * mapping.color[1] + mapping.color[0] + 0x0c,
        });
      else store.launchpads.currentLaunchpad?.output.playNote(index, "all", {
        rawVelocity: true,
        velocity: 0x0C
      })
    });
    
    //eslint-disable-next-line
  }, []);

  return val;
};
