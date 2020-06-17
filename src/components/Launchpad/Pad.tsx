import React from "react";
import { PadProps } from ".";
import { useStore } from "../../store";
import { useObserver } from "mobx-react-lite";
import { usePadState } from "../../hooks";

const Pad = ({ size, index, preview, page }: PadProps) => {
  const store = useStore();
  const { color, opacity } = usePadState(page, index);

  return useObserver(() => (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#8B8B8B",
        borderRadius: "4%",
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
          cursor: "pointer",
          backgroundColor: color,
          opacity,
        }}
      />
    </div>
  ));
};

export default Pad;
