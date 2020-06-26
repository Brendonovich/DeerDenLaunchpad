import React, { useState, useEffect, useCallback, useRef } from "react";
import SplitPane from "react-split-pane";
import { saveAs } from "file-saver";

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

  const [rightWidth, setRightWidth] = useState(400);
  const [pageHeight, setPageHeight] = useState(300);

  const [lpWindowSize, setLpWindowSize] = useState({
    width: width - 800 - 20,
    height: height - 300 - 20,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLpWindowSize({
      width: width - rightWidth - 20,
      height: height - pageHeight - 20,
    });
  }, [rightWidth, pageHeight, width, height]);

  const loadMappings = useCallback(async (file?: File) => {
    if (file === undefined) return;
    let json = JSON.parse(await file.text());
    store.mappings.mappings = json;
    // eslint-disable-next-line
  }, []);

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
            fontSize: 18,
          }}
        >
          <button
            style={{ margin: "0 5px" }}
            onClick={() =>
              saveAs(
                new Blob([JSON.stringify(store.mappings.mappings)], {
                  type: "application/json",
                }),
                "mappings.ddl"
              )
            }
          >
            Save
          </button>
          <button
            style={{ margin: "0 5px" }}
            onClick={() => fileRef.current?.click()}
          >
            Load
          </button>
          <input
            type="file"
            accept=".ddl"
            style={{ display: "none" }}
            onChange={(e) => loadMappings(e.target.files?.[0])}
            ref={fileRef}
          />
        </div>
        <Connection />
        {store.ui.selectedPad !== undefined && (
          <PadOptions pad={store.ui.selectedPad} />
        )}
      </>
    </SplitPane>
  ));
};
