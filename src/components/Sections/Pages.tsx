import React from "react";

import PagePreview from "../PagePreview";
import { useStore } from "../../store";
import { useObserver } from "mobx-react-lite";

const Pages = ({ height }: any) => {
  const store = useStore();

  return useObserver(() => (
      <div
        style={{
          display: "flex",
          overflow: "auto",
          flex: 1,
        }}
        className="center-scroll"
      >
        {store.mappings.mappings.map((_, index) => (
          <PagePreview
            key={index}
            name={index}
            page={index}
            height={height}
            selected={store.mappings.currentPage === index}
          />
        ))}
        <button
          style={{
            border: "none",
            backgroundColor: "#00000000",
            outline: "none",
            fontSize: 40,
            color: "#888888",
          }}
          onClick={() => store.mappings.createNewPage()}
        >
          +
        </button>
      </div>
  ));
};

export default Pages;
