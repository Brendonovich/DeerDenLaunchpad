import React, { useState, useEffect } from "react";
import AutosizingInput from "react-input-autosize";

import Launchpad from "./Launchpad";
import { useStore } from "../store";

interface Props {
  page: number;
  name: number;
  selected: boolean;
  height: number;
}

const PagePreview = ({ page, selected, height }: Props) => {
  const store = useStore();
  return (
    <div
      style={{
        height: "100%",
        padding: "0 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: selected ? "#484848" : undefined,
        cursor: "pointer",
      }}
      onClick={() => (store.mappings.currentPage = page)}
    >
      <Launchpad size={height * 0.7} preview={true} page={page} />
      <div
        style={{
          fontSize: Math.round(height * 0.06),
          color: "white",
          textAlign: "center",
          margin: 0,
          padding: "1% 8%",
          backgroundColor: "#585858",
          borderRadius: height,
          border: "1px solid white",
        }}
      >
        {page}
      </div>
    </div>
  );
};

export default PagePreview;
