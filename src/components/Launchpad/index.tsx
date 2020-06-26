import React from "react";
import Pad from "./Pad";
import CirclePad from "./CirclePad";

interface Props {
  size: number;
  preview?: boolean;
  page: number;
}

export interface PadProps {
  size: number;
  index: number;
  preview?: boolean;
  page: number;
}

const Launchpad = ({ size, preview, page }: Props) => {
  const padSize = size * (4 / 46);
  let padProps = { page, preview };
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "#181818",
        borderRadius: "2%",
        display: "flex",
        flexDirection: "column",
        padding: "1%",
      }}
    >
      <div
        style={{
          flex: 4,
          display: "flex",
          flexDirection: "row",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            flex: 41,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
          }}
        >
          {new Array(8).fill("", 0, 8).map((_, index) => (
            <CirclePad
              size={padSize}
              key={index * -1}
              index={-1 * (index + 1)}
              {...padProps}
            />
          ))}
        </div>
        <div style={{ flex: 4 }}></div>
      </div>
      <div style={{ flex: 41, display: "flex", flexDirection: "row" }}>
        <div
          style={{
            flex: 41,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {new Array(8)
            .fill(new Array(8).fill("", 0, 8), 0, 8)
            .map((row, ri) => (
              <div
                key={ri}
                style={{
                  width: "100%",
                  height: padSize,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {row.map((_: any, i: number) => (
                  <Pad
                    size={padSize}
                    key={ri * 0x10 + i}
                    index={ri * 0x10 + i}
                    preview={preview}
                    page={page}
                  />
                ))}
              </div>
            ))}
        </div>
        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {new Array(8).fill("", 0, 8).map((_, index) => (
            <CirclePad size={padSize} key={8 + index * 0x10} index={8 + index * 0x10} {...padProps} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Launchpad;
