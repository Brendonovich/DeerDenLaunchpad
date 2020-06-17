import React from "react";
import { PadProps } from ".";
import { useStore } from "../../store";
import { usePadState } from "../../hooks";
import { useObserver } from "mobx-react-lite";

const CirclePad = ({ size, index, preview, page }: PadProps) => {
  const store = useStore();
  const { color, opacity } = usePadState(page, index);
  
  return useObserver(() => (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#8B8B8B",
          borderRadius: "50%",
          width: size * 0.75,
          height: size * 0.75,
          boxShadow:
            index === store.ui.selectedPad && !preview
              ? `0 0 0 ${size * 0.07}px #FFF`
              : "",
        }}
        onClick={() => {
          if (!preview) store.ui.selectedPad = index;
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: color,
            opacity,
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  ));
};

export default CirclePad;
