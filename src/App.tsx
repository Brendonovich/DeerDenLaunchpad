import React, { useState, useEffect } from "react";
import SplitPane from "react-split-pane";

import "./App.css";

import Launchpad from "./components/Launchpad";
import Pages from "./components/Sections/Pages";

import { useWindowDimensions } from "./hooks";
import Connection from "./components/Sections/Connection";
import { useStore } from "./store";
import { useObserver } from "mobx-react-lite";
import PadOptions from "./components/PadOptions";

export default () => {
  const store = useStore();
  const { width, height } = useWindowDimensions();

  const [leftWidth, setLeftWidth] = useState(400);
  const [rightWidth, setRightWidth] = useState(400);
  const [pageHeight, setPageHeight] = useState(300);

  const [lpWindowSize, setLpWindowSize] = useState({
    width: width - 800 - 20,
    height: height - 300 - 20,
  });

  useEffect(() => {
    setLpWindowSize({
      width: width - leftWidth - rightWidth - 20,
      height: height - pageHeight - 20,
    });
  }, [leftWidth, rightWidth, pageHeight, width, height]);

  return useObserver(() => (
    <SplitPane
      split="vertical"
      minSize={350}
      className="primary"
      primary="second"
      resizerStyle={{ backgroundColor: "black" }}
      onChange={(e) => setRightWidth(e)}
      style={{ backgroundColor: "#2B2B2B" }}
    >
      <SplitPane
        split="horizontal"
        minSize={300}
        maxSize={height / 2}
        className="primary"
        primary="second"
        resizerStyle={{ backgroundColor: "black" }}
        onChange={(e) => setPageHeight(e)}
        pane2Style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Launchpad
            size={Math.min(lpWindowSize.width, lpWindowSize.height)}
            page={store.mappings.currentPage}
          />
        </div>
        <Pages height={pageHeight} />
      </SplitPane>
      <>
        <Connection />
        {store.ui.selectedPad !== undefined && (
          <PadOptions pad={store.ui.selectedPad} />
        )}
      </>
    </SplitPane>
  ));
};
